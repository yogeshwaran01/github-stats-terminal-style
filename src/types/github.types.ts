/**
 * Enum representing the activity status of a repository.
 */
export enum RepoStatus {
    /** Repository has been updated in the last 30 days. */
    Running = "RUNNING",
    /** Repository has been updated in the last year. */
    Idle = "IDLE",
    /** Repository has not been updated for over a year. */
    Zombie = "ZOMBIE",
}

/**
 * Represents a subset of a GitHub repository's data.
 */
export interface GithubRepo {
    /** The name of the repository. */
    name: string;
    /** The number of stars. */
    stargazers_count?: number;
    /** The number of forks. */
    forks_count?: number;
    /** The primary language of the repository. */
    language?: string | null;
    /** The last push date string (ISO 8601). */
    pushed_at: string;
}

/**
 * Represents the profile information of a GitHub user.
 */
export interface GithubUserProfile {
    /** The username (login). */
    login: string;
    /** The display name. */
    name: string | null;
    /** The bio text. */
    bio: string | null;
    /** Number of public repositories. */
    public_repos: number;
    /** Number of public gists. */
    public_gists: number;
    /** Number of followers. */
    followers: number;
    /** Account creation date string (ISO 8601). */
    created_at: string;
}

/**
 * Represents the aggregated statistics of a GitHub user for the terminal display.
 */
export interface GithubUserStats {
    /** The user's name. */
    name: string | null;
    /** The user's bio. */
    bio: string | null;
    /** Total number of repositories. */
    repoCount: number;
    /** Total number of gists. */
    gistCount: number;
    /** Total number of followers. */
    followersCount: number;
    /** Total accumulated stars across all repos. */
    totalStars: number;
    /** Total accumulated forks across all repos. */
    totalForks: number;
    /** Total number of commits (found via search). */
    commitCount: number;
    /** Total number of issues created. */
    issueCount: number;
    /** Total number of pull requests created. */
    prCount: number;
    /** Calculated uptime since account creation. */
    uptime: {
        years: number;
        days: number;
        since: string;
    };
    /** List of top performing repositories. */
    top_repos: Array<{
        name: string;
        stars: number;
        forks: number;
        language: string;
    }>;
    /** List of 'processes' (recent repos) with their status. */
    processes: Array<{
        name: string;
        status: RepoStatus;
        lastActivity: string;
    }>;
}
