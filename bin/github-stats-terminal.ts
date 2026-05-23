#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { TerminalGeneratorEngine } from "../src/services/TerminalGeneratorEngine";

/**
 * CLI Entrypoint to execute the three-stage Terminal SVG stats generator engine.
 */
async function main() {
    const args = process.argv.slice(2);

    let isBulk = false;
    let explicitUser: string | null = null;
    let explicitRepo: string | null = null;
    let defaultUsername: string | null = null;

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === undefined) continue;
        if (arg === "--bulk") {
            isBulk = true;
        } else if (arg === "--user") {
            explicitUser = args[i + 1] ?? null;
            i++;
        } else if (arg === "--repo") {
            explicitRepo = args[i + 1] ?? null;
            i++;
        } else if (!arg.startsWith("-")) {
            defaultUsername = arg;
        }
    }

    // Smart fallback: If no args are passed but terminalConfigs folder contains JSON, default to bulk mode
    if (!isBulk && !explicitUser && !explicitRepo && !defaultUsername) {
        const configDir = path.resolve(process.cwd(), "terminalConfigs");
        if (fs.existsSync(configDir)) {
            const hasJson = fs.readdirSync(configDir).some(file => file.endsWith(".json"));
            if (hasJson) {
                isBulk = true;
            }
        }
    }

    // Validate usage
    if (!isBulk && !explicitUser && !explicitRepo && !defaultUsername) {
        console.error("Usage:");
        console.error("  github-stats-terminal <username>                 Default: Generate user profile stats card");
        console.error("  github-stats-terminal --user <username>          Generate user profile stats card explicitly");
        console.error("  github-stats-terminal --repo <owner/repo>        Generate repository stats card explicitly");
        console.error("  github-stats-terminal --bulk                     Batch generate cards from terminalConfigs/ directory");
        process.exit(1);
    }

    // Validate Environment
    const token = process.env.GHT;
    if (!token) {
        console.error("Error: GitHub token not found in environment variable GHT.");
        process.exit(1);
    }

    try {
        if (isBulk) {
            const configDir = path.resolve(process.cwd(), "terminalConfigs");
            if (!fs.existsSync(configDir)) {
                console.error("Error: --bulk flag was passed, but terminalConfigs/ directory does not exist.");
                process.exit(1);
            }
            const jsonFiles = fs.readdirSync(configDir).filter(file => file.endsWith(".json"));
            if (jsonFiles.length === 0) {
                console.error("Error: --bulk flag was passed, but no JSON configuration files were found in terminalConfigs/.");
                process.exit(1);
            }

            console.log(`[Bulk Engine] Found ${jsonFiles.length} config file(s) in terminalConfigs/. Starting batch generation...`);

            // Ensure terminals directory exists in the current working directory
            const outputDir = path.resolve(process.cwd(), "terminals");
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            for (const file of jsonFiles) {
                const configPath = path.join("terminalConfigs", file);
                const configName = path.parse(file).name;
                const outputPath = path.resolve(outputDir, `${configName}.svg`);

                console.log(`\n--- Batch Processing: ${file} ---`);
                await TerminalGeneratorEngine.generate("", token, outputPath, configPath);
            }
            console.log(`\n✓ Bulk SVG generation complete! Output saved inside terminals/ folder.`);

        } else if (explicitRepo) {
            console.log(`[Repository Mode] Explicitly generating repo stats for target: ${explicitRepo}...`);
            await TerminalGeneratorEngine.generate(explicitRepo, token, undefined, undefined, "repo");

        } else if (explicitUser) {
            console.log(`[User Profile Mode] Explicitly generating user stats for target: ${explicitUser}...`);
            await TerminalGeneratorEngine.generate(explicitUser, token, undefined, undefined, "user");

        } else if (defaultUsername) {
            console.log(`[Default Mode] Generating stats for target: ${defaultUsername}...`);
            await TerminalGeneratorEngine.generate(defaultUsername, token);
        }
    } catch (error) {
        console.error("An error occurred during SVG generation:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

main();
