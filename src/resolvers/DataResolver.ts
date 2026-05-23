import { GithubUserStats, GithubRepoStats } from "../types/github.types";

export type CommandContextType = "user" | "repo";

/**
 * Shared context containing the faked terminal inputs and compiled profile statistics.
 */
export interface CommandContext {
    /** The context type indicating whether resolving user or repository metrics. */
    type: CommandContextType;
    /** The target identifier (e.g. username or owner/repo). */
    target: string;
    /** The loaded statistics retrieved from the active data resolver. */
    stats: GithubUserStats | GithubRepoStats;
    /** The parsed user configuration options. */
    config: Record<string, any>;
}


/**
 * Interface representing a data resolver.
 * Resolvers fetch and compile raw statistics from alternative data layers 
 * (e.g. user details, repository statuses, or GitHub actions telemetry).
 */
export interface DataResolver<T> {
    /**
     * Resolves the profile or metadata stats.
     * @param username The GitHub user profile username.
     * @param token Optional access token for API authorization.
     * @param config The parsed engine configuration object.
     * @returns A promise resolving to the data type T.
     */
    resolve(username: string, token?: string, config?: Record<string, any>): Promise<T>;
}
