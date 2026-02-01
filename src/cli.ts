#!/usr/bin/env node

import path = require("path");
import { GithubUserStats } from "./github";
import { TerminalGenerator } from "./terminalGenerator";

const token: string | undefined = process.env.GHT;
if (!token) {
    console.error("Error: GitHub token not found in environment variable GHT.");
    process.exit(1);
}

// const userStats = new GithubUser("yogeshwaran01", token);
// userStats.getStats().then(stats => {
//     // Write to json file
//     const fs = require('fs');
//     fs.writeFileSync('github_stats.json', JSON.stringify(stats, null, 2));
//     console.log("GitHub user stats written to github_stats.json");
// }).catch(error => {
//     console.error("Error fetching GitHub user stats:", error);
// });

// read the github_stats.json file and log to console
const fs = require('fs');
const data = fs.readFileSync('github_stats.json', 'utf-8');
const stats: GithubUserStats = JSON.parse(data);

const terminalGenerator: TerminalGenerator = new TerminalGenerator({
    userName: "yogeshwaran01",
    hostname: "github.com",
    typingSpeed: 250,
    theme: "ubuntu",
});

terminalGenerator
    ?.addCommand("whoami", stats.name ?? "Unknown User")
    // ?.addCommand("gh stats", {
    //     headers: ["Metric", "Value"],
    //     rows: [
    //         ["Repositories", stats.repoCount],
    //         ["Gists", stats.gistCount],
    //         ["Followers", stats.followersCount],
    //         ["Total Stars", stats.totalStars],
    //         ["Total Forks", stats.totalForks],
    //         ["Commits", stats.commitCount],
    //         ["Issues", stats.issueCount],
    //         ["Pull Requests", stats.prCount],
    //     ]
    // }, "table")
    ?.addCommand("neofetch", {
        username: "yogeshwaran01",
        hostname: "github.com",
        os: "Linux",
        kernel: "5.15.0-1051-azure",
        uptime: stats.uptime.years > 0 ? `${stats.uptime.years} years, ${stats.uptime.days} days` : `${stats.uptime.days} days`,
        shell: "/bin/zsh",
        cpu: "Intel(R) Xeon(R) CPU E5-2673 v4 @ 2.30GHz",
        memory: "512MB / 1GB",
        logoColor: "\x1b[35m", // Purple
        textColor: "\x1b[37m"  // White
    }, "neoFetch")
    // ?.addCommand("top", {
    //     headers: ["Repository", "Stars", "Forks", "Language"],
    //     rows: stats.top_repos.map(repo => [
    //         repo.name,
    //         repo.stars,
    //         repo.forks,
    //         repo.language
    //     ])
    // }, "table")
    ?.addCommand("ps", {
        headers: ["NAME", "STATUS", "LAST ACTIVITY"],
        rows: stats.processes.map(proc => [
            proc.name,
            proc.status,
            proc.lastActivity
        ])
    }, "table")
    ?.addCommand("uptime", `Uptime since account creation: ${stats.uptime.since}`)
    ?.addCommand("exit", null);

const svg: string = terminalGenerator.render();

fs.writeFileSync(path.resolve("output.svg"), svg);