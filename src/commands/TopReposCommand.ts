import { TerminalService } from "../services/TerminalService";
import { CommandContext } from "../resolvers/DataResolver";
import { TerminalCommand } from "./TerminalCommand";
import { GithubUserStats } from "../types/github.types";

/**
 * Command displaying a structured data table of the user's top-performing repositories.
 * Skips gracefully if run in single repository context.
 */
export class TopReposCommand implements TerminalCommand {
    public readonly name = "top-repos";

    public execute(terminal: TerminalService, context: CommandContext): void {
        if (context.type === 'repo') {
            terminal.addCommand(this.name, "Skip: top-repos command is only applicable in User Profile context.", "text");
            return;
        }

        const stats = context.stats as GithubUserStats;
        const reposTableData = {
            headers: ["Repository", "Stars", "Forks", "Language"],
            rows: stats.top_repos.map(repo => [
                repo.name,
                repo.stars.toString(),
                repo.forks.toString(),
                repo.language
            ])
        };

        terminal.addCommand(this.name, reposTableData, "table");
    }
}
