import { Octokit } from "@octokit/rest";
import { GithubRepo, GithubUserProfile, GithubUserStats, RepoStatus } from "../types/github.types";
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
}
