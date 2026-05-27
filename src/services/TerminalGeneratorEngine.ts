import * as fs from "fs";
import * as path from "path";
import { CommandRegistry } from "../commands/CommandRegistry";
import { ThemeName, THEMES } from "../constants/themes.constants";
import { CommandContext, CommandContextType } from "../resolvers/DataResolver";
import { GithubRepoResolver } from "../resolvers/GithubRepoResolver";
import { GithubUserResolver } from "../resolvers/GithubUserResolver";
import { Theme } from "../types/theme.types";
import { loadConfig, loadConfigFromPath } from "../utils/file.utils";
import { TerminalService } from "./TerminalService";
import { RepoStatus } from "../types/github.types";

/**
 * High-Level Orchestrator representing the complete three-stage SVG Stats Generator.
 * 1. Stage 1: Resolves statistics dynamically based on source layers (e.g. user details).
 * 2. Stage 2: Chains and executes configured terminal typing simulations (Commands Registry).
 * 3. Stage 3: Renders standard SVG frames and applies window title decorations.
 */
export class TerminalGeneratorEngine {
    /**
     * Orchestrates and runs the dynamic SVG stats generation cycle.
     * 
     * @param username The target GitHub username profile.
     * @param token Optional access token for API authorization.
     * @param outputPath Output path to write the generated SVG file (default: working directory).
     * @param configPath Optional configuration path to load.
     * @param sourceTypeOverride Explicitly force sourceType to "user" or "repo".
     */
    public static async generate(username: string, token?: string, outputPath?: string, configPath?: string, sourceTypeOverride?: "user" | "repo"): Promise<void> {
        // --- Load & Parse Configuration ---
        const config = configPath ? loadConfigFromPath(configPath) : loadConfig();
        
        console.log(`[Stage 1/3] Loading configuration and resolving stats...`);
        const styledSvg = await TerminalGeneratorEngine.generateSvgString(username, token, config, sourceTypeOverride);

        console.log(`[Stage 3/3] Writing SVG to local storage...`);
        // Save output to local filesystem
        const finalPath = outputPath || path.resolve(process.cwd(), "github_stats.svg");
        fs.writeFileSync(finalPath, styledSvg);

        console.log(`✓ Terminal Stats SVG successfully compiled at: ${finalPath}`);
    }

    /**
     * Generates and returns the styled SVG string directly in memory.
     * Helpful for serverless API endpoints and web integration.
     */
    public static async generateSvgString(
        username: string, 
        token?: string, 
        configOverride?: any, 
        sourceTypeOverride?: "user" | "repo",
        useMockData: boolean = false
    ): Promise<string> {
        const config = configOverride || loadConfig();
        const finalThemeName = (config.theme || "dracula") as ThemeName;
        const theme = THEMES[finalThemeName] || THEMES.dracula;
        const hostname = config.hostname || "github.com";
        const typingSpeed = typeof config.typingSpeed === "number" ? config.typingSpeed : 100;
        const headerStyle = config.headerStyle || "mac";

        const defaultCommands = ["whoami", "neofetch", "uptime", "exit"];
        const commandsList = Array.isArray(config.commands) ? config.commands : defaultCommands;

        // Check configuration for sourceType (defaults to user)
        const sourceType = sourceTypeOverride || (config.sourceType || "user") as CommandContextType;
        // Check for target. If sourceTypeOverride is explicitly passed, prioritize the CLI username target.
        const target = sourceTypeOverride ? username : (config.target || username);

        // --- Stage 1: Resolve Data ---
        let stats;
        if (useMockData) {
            if (sourceType === "repo") {
                stats = {
                    name: target.split("/")[1] || "github-stats-terminal-style",
                    fullName: target,
                    description: "Generate GitHub Stats in a retro-style terminal emulator interface!",
                    stars: 128,
                    forks: 32,
                    watchers: 128,
                    openIssues: 3,
                    size: 2450,
                    license: "MIT",
                    createdAt: "2023-03-12T00:00:00Z",
                    pushedAt: "2026-05-27T00:00:00Z",
                    uptime: { years: 3, days: 76, since: "3 years, 76 days" },
                    languages: [
                        { name: "TypeScript", percentage: 84 },
                        { name: "JavaScript", percentage: 12 },
                        { name: "HTML", percentage: 4 }
                    ],
                    recentCommits: [
                        { sha: "9f8a3d1", author: "yogeshwaran01", date: "2026-05-27", message: "feat: Add interactive playground builder" },
                        { sha: "4b2e1f2", author: "yogeshwaran01", date: "2026-05-26", message: "refactor: Modularize graphics rendering engine" },
                        { sha: "7d9c8e3", author: "yogeshwaran01", date: "2026-05-24", message: "chore: Update theme variables & palettes" }
                    ]
                };
            } else {
                stats = {
                    name: "John Doe",
                    bio: "Building the future of developer terminal cards 🚀",
                    repoCount: 42,
                    gistCount: 12,
                    followersCount: 854,
                    totalStars: 432,
                    totalForks: 128,
                    commitCount: 2450,
                    issueCount: 89,
                    prCount: 164,
                    uptime: { years: 3, days: 142, since: "3 years, 142 days" },
                    top_repos: [
                        { name: "github-stats-terminal", stars: 254, forks: 43, language: "TypeScript" },
                        { name: "portfoli-theme", stars: 102, forks: 12, language: "CSS" },
                        { name: "react-lazy-loader", stars: 64, forks: 8, language: "JavaScript" }
                    ],
                    processes: [
                        { name: "github-stats-terminal", status: RepoStatus.Running, lastActivity: "2 hours ago" },
                        { name: "portfoli-theme", status: RepoStatus.Idle, lastActivity: "12 days ago" },
                        { name: "react-lazy-loader", status: RepoStatus.Zombie, lastActivity: "412 days ago" }
                    ],
                    languages: [
                        { name: "TypeScript", percentage: 84 },
                        { name: "JavaScript", percentage: 12 },
                        { name: "HTML", percentage: 4 }
                    ]
                };
            }
        } else {
            let resolver;
            if (sourceType === "repo") {
                resolver = new GithubRepoResolver();
            } else {
                resolver = new GithubUserResolver();
            }
            stats = await resolver.resolve(target, token, config);
        }

        const context: CommandContext = {
            type: sourceType,
            target,
            stats,
            config
        };

        // --- Stage 2: Generate Commands ---
        // Auto-scale terminal console height dynamically based on command length to look premium!
        const terminalHeight = Math.max(24, Math.min(60, 10 + commandsList.length * 4.5));

        // Extract simple prompt username (for repositories, we take the repository owner)
        const promptUserName = sourceType === "repo" ? target.split("/")[0] : target;

        const terminal = new TerminalService({
            userName: promptUserName,
            hostname: hostname,
            typingSpeed: typingSpeed,
            theme: finalThemeName,
            headerStyle: headerStyle,
            width: 80,
            height: terminalHeight
        });

        // Run commands dynamically from config arrays
        for (const cmdName of commandsList) {
            if (typeof cmdName !== "string") continue;
            const command = CommandRegistry.getCommand(cmdName);
            await command.execute(terminal, context);
        }

        // --- Stage 3: Render & Post-Process ---
        const rawSvg = terminal.render();
        return TerminalGeneratorEngine.applyHeader(rawSvg, headerStyle, theme);
    }

    /**
     * Applies the custom window decoration style to the rendered SVG string.
     * 
     * @param svg The raw SVG string compiled from the terminal events.
     * @param style The requested title bar style ('mac', 'windows', 'retro').
     * @param theme The visual color palette configuration.
     * @returns The decorated SVG string.
     */
    private static applyHeader(svg: string, style: 'mac' | 'windows' | 'retro', theme: Theme): string {
        if (style === 'retro') {
            return svg;
        }

        if (style === 'windows') {
            // Extract the width of the SVG container
            const widthMatch = svg.match(/<svg[^>]+width="(\d+(?:\.\d+)?)"/);
            const width = widthMatch ? parseFloat(widthMatch[1]!) : 840;
            const buttonsX = width - 70;

            const windowsHeader = `
<svg y="0%" x="0%" width="100%">
  <!-- Window Title -->
  <text x="20" y="24" font-family="Monaco,Consolas,Menlo,monospace" font-size="12" fill="${theme.foreground}88">Command Prompt</text>
  <!-- Windows Window Control Buttons on the right -->
  <g transform="translate(${buttonsX}, 10)" stroke="${theme.foreground}88" stroke-dasharray="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" fill="none">
    <!-- Minimize -->
    <line x1="0" y1="12" x2="10" y2="12" />
    <!-- Maximize -->
    <rect x="20" y="2" width="10" height="10" />
    <!-- Close -->
    <line x1="40" y1="2" x2="50" y2="12" />
    <line x1="50" y1="2" x2="40" y2="12" />
  </g>
</svg>`.trim();

            const macDotsRegex = /<svg y="0%" x="0%"><circle cx="20"[^>]*><\/circle><circle cx="40"[^>]*><\/circle><circle cx="60"[^>]*><\/circle><\/svg>/;
            return svg.replace(macDotsRegex, windowsHeader);
        }

        return svg;
    }
}
