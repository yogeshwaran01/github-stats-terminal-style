import { GithubUserStats } from "../types/github.types";
import { GitHubService } from "../services/GitHubService";
import { DataResolver } from "./DataResolver";

/**
 * Stage 1 Resolver that fetches and aggregates comprehensive user profile metrics.
 */
export class GithubUserResolver implements DataResolver<GithubUserStats> {
    /**
     * Resolves user statistics using the GitHubService wrapper.
     * @param username The GitHub profile login name.
     * @param token Optional access token for API authorization.
     * @param config The parsed configuration object.
     * @returns A promise resolving to user profile statistics.
     */
    public async resolve(username: string, token?: string, config?: Record<string, any>): Promise<GithubUserStats> {
        const githubService = new GitHubService(username, token);
        return githubService.getStats();
    }
}
