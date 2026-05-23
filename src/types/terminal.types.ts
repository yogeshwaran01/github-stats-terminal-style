import { ThemeName } from "../constants/themes.constants";

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
    /** The style of the terminal window header ('mac', 'windows', 'retro'). */
    headerStyle?: 'mac' | 'windows' | 'retro';
    /** Custom list of commands to run. */
    commands?: string[];
}
