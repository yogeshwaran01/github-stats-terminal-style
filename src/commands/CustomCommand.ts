import { TerminalService } from "../services/TerminalService";
import { CommandContext } from "../resolvers/DataResolver";
import { TerminalCommand } from "./TerminalCommand";

/**
 * Fallback Command representing customizable faked terminal inputs.
 * Maps custom commands (e.g. "cat bio.txt") to faked string outputs 
 * from the user configuration.
 */
export class CustomCommand implements TerminalCommand {
    public readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    public execute(terminal: TerminalService, context: CommandContext): void {
        const customCommands = context.config.customCommands || {};
        const output = customCommands[this.name] || `bash: command not found: ${this.name}`;
        terminal.addCommand(this.name, output, "text");
    }
}
