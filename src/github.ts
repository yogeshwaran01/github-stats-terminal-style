import { Octokit } from "@octokit/rest";

export interface GithubUserStats {
    name: string | null;
    bio: string | null;
    repoCount: number;
    gistCount: number;
    followersCount: number;
    totalStars: number;
    totalForks: number;
    commitCount: number;
    issueCount: number;
    prCount: number;
    uptime: {
        years: number;
        days: number;
        since: string;
    };
    top_repos: Array<{
        name: string;
        stars: number;
        forks: number;
        language: string;
    }>;
    processes: Array<{
        name: string;
        status: RepoStatus;
        lastActivity: string;
    }>;
}

export enum RepoStatus {
    Running = "RUNNING",
    Idle = "IDLE",
    Zombie = "ZOMBIE",
}

export class GithubUser {
    private octokit: Octokit;
    private username: string;

    constructor(username: string, token?: string) {
        this.username = username;
        this.octokit = new Octokit({
            auth: token,
        });
    }

    async getStats(): Promise<GithubUserStats> {
        const user: any = await this.getUserProfile();
        user.name
        const repos = await this.getAllRepos();

        const { totalStars, totalForks } = this.aggregateRepoStats(repos);

        const [commitCount, issueCount, prCount] = await Promise.all([
            this.searchCommits(),
            this.searchIssues(),
            this.searchPRs(),
        ]);

        return {
            name: user.name ?? null,
            bio: user.bio ?? null,
            repoCount: user.public_repos,
            gistCount: user.public_gists,
            followersCount: user.followers,
            totalStars,
            totalForks,
            commitCount,
            issueCount,
            prCount,
            uptime: this.calculateUptime(user.created_at),
            top_repos: this.getTopRepos(repos),
            processes: this.getProcesses(repos),

        };
    }

    private async getUserProfile(): Promise<any> {
        const { data } = await this.octokit.users.getByUsername({
            username: this.username,
        });
        return data;
    }

    private getTopRepos(repos: any[]) {
        const sortedByStars = repos
            .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
            .slice(0, 5)
            .map((repo) => ({
                name: repo.name,
                stars: repo.stargazers_count ?? 0,
                forks: repo.forks_count ?? 0,
                language: repo.language ?? "Unknown",
            }));
        return sortedByStars;
    }

    private getProcesses(repos: any[]) {
        const now = Date.now();
        return repos
            .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
            .slice(0, 5)
            .map(repo => {
                const lastPush = new Date(repo.pushed_at).getTime();
                const daysAgo = (now - lastPush) / (1000 * 60 * 60 * 24);
                let status: RepoStatus;
                if (daysAgo < 30) status = RepoStatus.Running;
                else if (daysAgo < 365) status = RepoStatus.Idle;
                else status = RepoStatus.Zombie;
                return {
                    name: repo.name,
                    status: status,
                    lastActivity: `${Math.floor(daysAgo)} days ago`,
                };
            });
    }

    private async getAllRepos() {
        return await this.octokit.paginate(
            this.octokit.repos.listForUser,
            {
                username: this.username,
                per_page: 100,
            }
        );
    }

    private aggregateRepoStats(repos: any[]) {
        let totalStars = 0;
        let totalForks = 0;

        for (const repo of repos) {
            totalStars += repo.stargazers_count ?? 0;
            totalForks += repo.forks_count ?? 0;
        }

        return { totalStars, totalForks };
    }

    private async searchCommits(): Promise<number> {
        const result = await this.octokit.search.commits({
            q: `author:${this.username}`,
            per_page: 1,
        });

        return result.data.total_count;
    }

    private async searchIssues(): Promise<number> {
        const result = await this.octokit.search.issuesAndPullRequests({
            q: `type:issue author:${this.username}`,
            per_page: 1,
        });

        return result.data.total_count;
    }

    private async searchPRs(): Promise<number> {
        const result = await this.octokit.search.issuesAndPullRequests({
            q: `type:pr author:${this.username}`,
            per_page: 1,
        });

        return result.data.total_count;
    }

    private calculateUptime(createdAt: string) {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const diffMs = now.getTime() - createdDate.getTime();
        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        return {
            years: Math.floor(totalDays / 365),
            days: totalDays % 365,
            since: createdDate.toDateString(),
        };
    }
}
