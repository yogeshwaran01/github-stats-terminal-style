#!/usr/bin/env node

import path = require("path");
import fs = require("fs");
import { ThemeName } from "../src/config/themes.config";
import { GitHubService } from "../src/services/GitHubService";
import { TerminalService } from "../src/services/TerminalService";
import { GithubUserStats } from "../src/types/github.types";
import { NeoFetchInfo } from "../src/utils/formatter.utils";

/**
 * Main function to execute the simple CLI workflow.
 */
async function main() {
    // 1. Parse Arguments (Skip node and script path)
    const args = process.argv.slice(2);
    if (args.length < 1 || !args[0]) {
        console.error("Usage: github-stats-terminal <username> [theme]");
        console.error("Example: github-stats-terminal yogeshwaran01 dracula");
        process.exit(1);
    }

    const username = args[0];
    const theme = (args[1] || "dracula") as ThemeName; // Default to dracula

    // 2. Validate Environment
    const token = process.env.GHT;
    if (!token) {
        console.error("Error: GitHub token not found in environment variable GHT.");
        process.exit(1);
    }

    console.log(`Fetching stats for user: ${username}...`);

    try {
        // 3. Fetch Data
        const githubService: GitHubService = new GitHubService(username, token);
        const stats: GithubUserStats = await githubService.getStats();
        //const stats: GithubUserStats = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "github_stats.json"), "utf-8"));

        // 4. Render Terminal Session
        const terminalService = new TerminalService({
            userName: username,
            hostname: "github.com",
            typingSpeed: 100, // Faster default for better UX
            theme: theme,
        });

        // Prepare NeoFetch Info
        const neoFetchData: NeoFetchInfo = {
            title: {
                user: username,
                host: "github.com"
            },
            info: {
                "OS": "GitHub",
                "Repos": stats.repoCount.toString(),
                "Gists": stats.gistCount.toString(),
                "Stars": stats.totalStars.toString(),
                "Followers": stats.followersCount.toString(),
                "Pull Requests": stats.prCount.toString(),
                "Issues": stats.issueCount.toString(),
            }
        };

        // Prepare Top Repos Table

        const uptimeString = `${stats.uptime.years} years, ${stats.uptime.days} days`;
        // Add Command Sequence
        terminalService
            .addCommand("whoami", stats.name ?? username)
            .addCommand("neofetch", neoFetchData, "neoFetch")
            .addCommand("uptime", uptimeString)
            .addCommand("exit", "exit");

        // 5. Save Output
        const svg = terminalService.render();
        const outputPath = path.resolve(process.cwd(), "github_stats.svg");
        fs.writeFileSync(outputPath, svg);
        console.log(`✓ Generated SVG at ${outputPath}`);

    } catch (error) {
        console.error("An error occurred:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

main();
