import { Octokit } from "@octokit/rest";
import { GithubRepo, GithubUserProfile, GithubUserStats, GithubRepoStats, RepoStatus } from "../types/github.types";
import { calculateUptime } from "../utils/date.utils";

/**
 * Service to interact with the GitHub API and aggregate user statistics.
 */
export class GitHubService {

    private octokit: Octokit;
    private username: string;

    /**
     * Initializes a new instance of the GitHubService class.
     * @param username - The GitHub username to fetch stats for.
     * @param token - Optional GitHub personal access token for higher rate limits.
     */
    constructor(username: string, token?: string) {
        this.username = username;
        this.octokit = new Octokit({
            auth: token,
        });
    }

    /**
     * Aggregates and returns comprehensive statistics for the GitHub user.
     * @returns A promise that resolves to the GithubUserStats object.
     */
    public async getStats(): Promise<GithubUserStats> {
        const user = await this.getUserProfile();
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
            uptime: calculateUptime(user.created_at),
            top_repos: this.getTopRepos(repos),
            processes: this.getProcesses(repos),
            languages: this.calculateLanguages(repos),
        };
    }

    /**
     * Fetches the user profile data.
     * @returns A promise resolving to the user profile.
     */
    private async getUserProfile(): Promise<GithubUserProfile> {
        const { data } = await this.octokit.users.getByUsername({
            username: this.username,
        });
        return data as unknown as GithubUserProfile;
    }

    /**
     * Fetches all public repositories for the user.
     * @returns A promise resolving to a list of repositories.
     */
    private async getAllRepos(): Promise<GithubRepo[]> {
        const repos = await this.octokit.paginate(
            this.octokit.repos.listForUser,
            {
                username: this.username,
                per_page: 100,
            }
        );
        return repos as unknown as GithubRepo[];
    }

    /**
     * Calculates total stars and forks across all repositories.
     * @param repos List of user repositories.
     * @returns Object containing totalStars and totalForks.
     */
    private aggregateRepoStats(repos: GithubRepo[]) {
        let totalStars = 0;
        let totalForks = 0;

        for (const repo of repos) {
            totalStars += repo.stargazers_count ?? 0;
            totalForks += repo.forks_count ?? 0;
        }

        return { totalStars, totalForks };
    }

    /**
     * Searches specifically for commits authored by the user.
     * @returns Total count of commits.
     */
    private async searchCommits(): Promise<number> {
        const result = await this.octokit.search.commits({
            q: `author:${this.username}`,
            per_page: 1,
        });
        return result.data.total_count;
    }

    /**
     * Searches for issues created by the user.
     * @returns Total count of issues.
     */
    private async searchIssues(): Promise<number> {
        const result = await this.octokit.search.issuesAndPullRequests({
            q: `type:issue author:${this.username}`,
            per_page: 1,
        });
        return result.data.total_count;
    }

    /**
     * Searches for pull requests authored by the user.
     * @returns Total count of pull requests.
     */
    private async searchPRs(): Promise<number> {
        const result = await this.octokit.search.issuesAndPullRequests({
            q: `type:pr author:${this.username}`,
            per_page: 1,
        });
        return result.data.total_count;
    }

    /**
     * Selects the top 5 repositories sorted by stargazers count.
     * @param repos List of all repositories.
     * @returns Array of top 5 styled repository objects.
     */
    private getTopRepos(repos: GithubRepo[]) {
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

    /**
     * Transforms repositories into 'processes' for a 'ps' (process status) style display.
     * Categorizes status as Running, Idle, or Zombie based on last push date.
     * @param repos List of all repositories.
     * @returns Array of the top 5 most recently active repositories with status.
     */
    private getProcesses(repos: GithubRepo[]) {
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

    /**
     * Calculates programming language distribution based on repository counts.
     * @param repos List of repositories.
     * @returns Array of languages and their usage percentages.
     */
    private calculateLanguages(repos: GithubRepo[]) {
        const langCounts: Record<string, number> = {};
        let totalWithLanguage = 0;

        for (const repo of repos) {
            const lang = repo.language;
            if (lang && lang !== "Unknown") {
                langCounts[lang] = (langCounts[lang] || 0) + 1;
                totalWithLanguage++;
            }
        }

        if (totalWithLanguage === 0) {
            return [];
        }

        return Object.entries(langCounts)
            .map(([name, count]) => ({
                name,
                percentage: Math.round((count / totalWithLanguage) * 100),
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5);
    }

    /**
     * Fetches and aggregates statistics for a single repository.
     * @param owner The owner/namespace of the repository.
     * @param repoName The name of the repository.
     * @returns A promise resolving to the GithubRepoStats object.
     */
    public async getRepoStats(owner: string, repoName: string): Promise<GithubRepoStats> {
        const [repoData, languagesData, commitsData] = await Promise.all([
            this.octokit.repos.get({ owner, repo: repoName }),
            this.octokit.repos.listLanguages({ owner, repo: repoName }),
            this.octokit.repos.listCommits({ owner, repo: repoName, per_page: 5 }),
        ]);

        const repo = repoData.data;
        const languages = this.calculateRepoLanguages(languagesData.data as Record<string, number>);
        
        const recentCommits = (commitsData.data || []).map((c: any) => ({
            sha: c.sha.slice(0, 7),
            author: c.commit.author?.name || c.author?.login || "Unknown",
            date: c.commit.author?.date 
                ? new Date(c.commit.author.date).toLocaleDateString()
                : "Unknown",
            message: c.commit.message.split('\n')[0].slice(0, 50),
        }));

        return {
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            stars: repo.stargazers_count ?? 0,
            forks: repo.forks_count ?? 0,
            watchers: repo.watchers_count ?? 0,
            openIssues: repo.open_issues_count ?? 0,
            size: repo.size ?? 0,
            license: repo.license?.name ?? repo.license?.spdx_id ?? null,
            createdAt: repo.created_at,
            pushedAt: repo.pushed_at || repo.updated_at,
            uptime: calculateUptime(repo.created_at),
            languages,
            recentCommits
        };
    }

    /**
     * Aggregates a single repository's language breakdown into percentages.
     * @param langBytes Object mapping language names to code sizes in bytes.
     * @returns Array of sorted language percentage contributions.
     */
    private calculateRepoLanguages(langBytes: Record<string, number>) {
        const entries = Object.entries(langBytes);
        const totalBytes = entries.reduce((sum, [_, bytes]) => sum + bytes, 0);
        if (totalBytes === 0) return [];
        return entries
            .map(([name, bytes]) => ({
                name,
                percentage: Math.round((bytes / totalBytes) * 100),
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5);
    }
}

