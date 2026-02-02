import { ThemeName } from "../config/themes.config";

/**
 * Configuration options for the Terminal session.
 */
export interface TerminalConfig {
    /** The GitHub username to display in the prompt. */
    userName: string;
    /** The visual theme of the terminal. */
    theme: ThemeName;
    /** Typing speed simulation in milliseconds per keystroke. */
    typingSpeed: number;
    /** The hostname to display in the prompt (e.g., 'github.com'). */
    hostname: string;
    /** Custom width of the terminal window (default: 80). */
    width?: number;
    /** Custom height of the terminal window (default: 24). */
    height?: number;
}
