import { TerminalConfig } from "./terminal.types";

/**
 * Configuration for dynamic data fetching.
 */
export interface DataFetcherConfig {
    /** The provider to fetch data from (currently only 'github'). */
    provider: "github";
    /** The type of resource to fetch. */
    resource: "userStats" | "topRepos" | "userInfo";
    /** Optional arguments for the fetcher (e.g. limit, filter). */
    args?: Record<string, any>;
}

/**
 * Represents a single command to be executed in the terminal session.
 */
export interface TerminalCommand {
    /** The command string to simulate typing (e.g. "whoami"). */
    command: string;
    /** The type of output renderer to use. */
    type: "text" | "table" | "chart" | "neoFetch" | "list";
    /** The data payload for the renderer. Specific shape depends on 'type'. Optional if 'fetcher' is provided. */
    data?: any;
    /** Configuration to fetch data dynamically. If provided, 'data' property acts as a fallback or override. */
    fetcher?: DataFetcherConfig;
}

/**
 * Represents a complete terminal session definition.
 * This structure corresponds to the input JSON file format.
 */
export interface TerminalSession {
    /** Configuration for the terminal window and behavior. */
    config: TerminalConfig;
    /** Ordered sequence of commands to execute. */
    session: TerminalCommand[];
}
