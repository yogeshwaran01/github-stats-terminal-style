import { TerminalService } from "../services/TerminalService";
import { CommandContext } from "../resolvers/DataResolver";

/**
 * Interface representing a faked terminal shell execution command.
 * Concrete command classes implement this contract to simulate their typing 
 * and terminal graphics rendering lifecycles inside the recorded SVG frame.
 */
export interface TerminalCommand {
    /** The actual command string typed in the terminal prompt (e.g. "whoami"). */
    name: string;
    /**
     * Executes the terminal command action.
     * Simulates prompt typing, formats the output, and prints it onto the terminal canvas.
     * 
     * @param terminal The active TerminalService session recorder.
     * @param context The shared command execution context holding resolved stats and configurations.
     */
    execute(terminal: TerminalService, context: CommandContext): void | Promise<void>;
}
