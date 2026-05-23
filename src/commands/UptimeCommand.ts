import { TerminalService } from "../services/TerminalService";
import { CommandContext } from "../resolvers/DataResolver";
import { TerminalCommand } from "./TerminalCommand";
import { GithubUserStats, GithubRepoStats } from "../types/github.types";

/**
 * Command representing faked system uptime based on user account or repository creation date.
 */
export class UptimeCommand implements TerminalCommand {
    public readonly name = "uptime";

    public execute(terminal: TerminalService, context: CommandContext): void {
        const stats = context.stats as (GithubUserStats | GithubRepoStats);
        const uptimeString = `${stats.uptime.years} years, ${stats.uptime.days} days`;
        terminal.addCommand(this.name, uptimeString, "text");
    }
}
