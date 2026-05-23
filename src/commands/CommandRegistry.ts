import { CustomCommand } from "./CustomCommand";
import { ExitCommand } from "./ExitCommand";
import { LanguagesCommand } from "./LanguagesCommand";
import { NeofetchCommand } from "./NeofetchCommand";
import { PsCommand } from "./PsCommand";
import { TerminalCommand } from "./TerminalCommand";
import { TopReposCommand } from "./TopReposCommand";
import { WhoamiCommand } from "./WhoamiCommand";
import { UptimeCommand } from "./UptimeCommand";
import { GitLogCommand } from "./GitLogCommand";

/**
 * Static registry of all supported built-in terminal commands.
 * Offers streamlined execution pipelines matching command strings with faked console sessions.
 */
export class CommandRegistry {
    private static readonly builtins: Map<string, TerminalCommand> = new Map<string, TerminalCommand>([
        ["whoami", new WhoamiCommand()],
        ["neofetch", new NeofetchCommand()],
        ["uptime", new UptimeCommand()],
        ["languages", new LanguagesCommand()],
        ["top-repos", new TopReposCommand()],
        ["ps", new PsCommand()],
        ["exit", new ExitCommand()],
        ["git-log", new GitLogCommand()]
    ]);



    /**
     * Resolves a command class corresponding to the given command name.
     * Instantiates a dynamic CustomCommand fallback if it's not a built-in command.
     * 
     * @param name The typed command name string (e.g. 'ps' or 'cat bio.txt').
     * @returns Concrete TerminalCommand execution instance.
     */
    public static getCommand(name: string): TerminalCommand {
        const trimmed = name.trim();
        const builtin = this.builtins.get(trimmed);
        if (builtin) {
            return builtin;
        }
        return new CustomCommand(trimmed);
    }
}
