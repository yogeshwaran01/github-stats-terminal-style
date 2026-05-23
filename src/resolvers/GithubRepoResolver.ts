import { GithubRepoStats } from "../types/github.types";
import { GitHubService } from "../services/GitHubService";
import { DataResolver } from "./DataResolver";

/**
 * Stage 1 Resolver that fetches and aggregates statistics for a single repository.
 * The target parameter should be in 'owner/repo' format.
 */
export class GithubRepoResolver implements DataResolver<GithubRepoStats> {
    /**
     * Resolves single repository statistics using the GitHubService wrapper.
     * @param target The target repository path (e.g. 'yogeshwaran01/github-stats-terminal-style').
     * @param token Optional access token for API authorization.
     * @param config The parsed configuration object.
     * @returns A promise resolving to single repository statistics.
     */
    public async resolve(target: string, token?: string, config?: Record<string, any>): Promise<GithubRepoStats> {
        const parts = target.split("/");
        if (parts.length !== 2 || !parts[0] || !parts[1]) {
            throw new Error(`Invalid repository target format: "${target}". Expected "owner/repository".`);
        }
        
        const owner = parts[0];
        const repoName = parts[1];
        
        const githubService = new GitHubService(owner, token);
        return githubService.getRepoStats(owner, repoName);
    }
}
