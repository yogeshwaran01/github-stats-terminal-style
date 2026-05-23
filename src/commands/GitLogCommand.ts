import { TerminalService } from "../services/TerminalService";
import { CommandContext } from "../resolvers/DataResolver";
import { TerminalCommand } from "./TerminalCommand";
import { GithubRepoStats } from "../types/github.types";
import { ANSI } from "../constants/ansi.constants";

/**
 * Command representing faked git log git version control telemetry.
 * Displays the 5 most recent commits on the current branch (SHA hash, author, date, and commit message).
 */
export class GitLogCommand implements TerminalCommand {
    public readonly name = "git-log";

    public execute(terminal: TerminalService, context: CommandContext): void {
        if (context.type === 'user') {
            terminal.addCommand(this.name, "git-log: command is only applicable in Repository context.", "text");
            return;
        }

        const stats = context.stats as GithubRepoStats;
        const commits = stats.recentCommits || [];
        
        if (commits.length === 0) {
            terminal.addCommand(this.name, " No commits found in this repository.", "text");
            return;
        }

        // Format commit entries beautifully with standard git log color styling!
        const logLines = commits.map(c => {
            const yellowSha = `${ANSI.yellow}commit ${c.sha}${ANSI.reset}`;
            const authorLine = `Author: ${c.author}`;
            const dateLine = `Date:   ${c.date}`;
            const msgLine = `\n    ${c.message}\n`;
            return `${yellowSha}\n${authorLine}\n${dateLine}${msgLine}`;
        });

        // Add faked console command execution!
        terminal.addCommand("git log -n 5", logLines.join('\n'), "text");
    }
}
