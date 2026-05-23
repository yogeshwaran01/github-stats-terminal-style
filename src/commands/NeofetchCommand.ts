import { TerminalService } from "../services/TerminalService";
import { CommandContext } from "../resolvers/DataResolver";
import { NeoFetchGraphicsData } from "../types/graphics.types";
import { TerminalCommand } from "./TerminalCommand";
import { GithubUserStats, GithubRepoStats } from "../types/github.types";

/**
 * Command representing faked system telemetry and stats summary using "neofetch".
 * Polymorphically adapts to show user profile details or repository metadata.
 */
export class NeofetchCommand implements TerminalCommand {
    public readonly name = "neofetch";

    public execute(terminal: TerminalService, context: CommandContext): void {
        const hostname = context.config.hostname || "github.com";
        const neoFetchData: NeoFetchGraphicsData = {
            title: {
                user: context.target,
                host: hostname
            },
            info: {}
        };

        if (context.type === 'repo') {
            const stats = context.stats as GithubRepoStats;
            neoFetchData.title.user = stats.name;
            neoFetchData.info = {
                "OS": "GitHub Repo",
                "Stars": stats.stars.toString(),
                "Forks": stats.forks.toString(),
                "Watchers": stats.watchers.toString(),
                "Issues": stats.openIssues.toString(),
                "Size": `${(stats.size / 1024).toFixed(2)} MB`,
                "License": stats.license ?? "None"
            };
        } else {
            const stats = context.stats as GithubUserStats;
            neoFetchData.info = {
                "OS": "GitHub Profile",
                "Repos": stats.repoCount.toString(),
                "Gists": stats.gistCount.toString(),
                "Stars": stats.totalStars.toString(),
                "Followers": stats.followersCount.toString(),
                "Pull Requests": stats.prCount.toString(),
                "Issues": stats.issueCount.toString(),
            };
        }

        terminal.addCommand(this.name, neoFetchData, "neoFetch");
    }
}
