import { TerminalService } from "../services/TerminalService";
import { CommandContext } from "../resolvers/DataResolver";
import { TerminalCommand } from "./TerminalCommand";
import { GithubUserStats, GithubRepoStats } from "../types/github.types";

/**
 * Command representing faked programming language statistics breakdown.
 * Generates an ASCII horizontal bar chart representing top language percentages.
 */
export class LanguagesCommand implements TerminalCommand {
    public readonly name = "languages";

    public execute(terminal: TerminalService, context: CommandContext): void {
        const stats = context.stats as (GithubUserStats | GithubRepoStats);
        terminal.addCommand(this.name, stats.languages, "barChart");
    }
}
