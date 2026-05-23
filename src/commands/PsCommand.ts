import { TerminalService } from "../services/TerminalService";
import { CommandContext } from "../resolvers/DataResolver";
import { TerminalCommand } from "./TerminalCommand";
import { GithubUserStats } from "../types/github.types";

/**
 * Command displaying faked Unix process status monitor.
 * Skips gracefully if executed in a single repository context.
 */
export class PsCommand implements TerminalCommand {
    public readonly name = "ps";

    public execute(terminal: TerminalService, context: CommandContext): void {
        if (context.type === 'repo') {
            terminal.addCommand(this.name, "ps: No active sub-processes in a single repository scope.", "text");
            return;
        }

        const stats = context.stats as GithubUserStats;
        const psTableData = {
            headers: ["PID", "TTY", "STATUS", "TIME", "CMD"],
            rows: stats.processes.map((proc, index) => [
                (index + 100).toString(),
                "pts/0",
                proc.status,
                proc.lastActivity,
                proc.name
            ])
        };

        terminal.addCommand(this.name, psTableData, "table");
    }
}
