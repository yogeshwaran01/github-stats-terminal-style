import { TerminalService } from "../services/TerminalService";
import { CommandContext } from "../resolvers/DataResolver";
import { TerminalCommand } from "./TerminalCommand";
import { GithubUserStats, GithubRepoStats } from "../types/github.types";

/**
 * Command representing standard Unix "whoami" faked shell prompt.
 * Prints the user's profile display name or repository namespace based on context.
 */
export class WhoamiCommand implements TerminalCommand {
    public readonly name = "whoami";

    public execute(terminal: TerminalService, context: CommandContext): void {
        if (context.type === 'repo') {
            const stats = context.stats as GithubRepoStats;
            terminal.addCommand(this.name, stats.fullName, "text");
        } else {
            const stats = context.stats as GithubUserStats;
            terminal.addCommand(this.name, stats.name ?? context.target, "text");
        }
    }
}
