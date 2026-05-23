import { TerminalService } from "../services/TerminalService";
import { CommandContext } from "../resolvers/DataResolver";
import { TerminalCommand } from "./TerminalCommand";

/**
 * Command representing standard shell exit session command.
 */
export class ExitCommand implements TerminalCommand {
    public readonly name = "exit";

    public execute(terminal: TerminalService, context: CommandContext): void {
        terminal.addCommand(this.name, "exit", "text");
    }
}
