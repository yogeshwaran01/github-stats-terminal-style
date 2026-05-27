import { TerminalGeneratorEngine } from "../services/TerminalGeneratorEngine";
import { ThemeName } from "../constants/themes.constants";
import * as fs from "fs";
import * as path from "path";

async function run() {
    try {
        const username = process.env.INPUT_USERNAME || "";
        const token = process.env.INPUT_TOKEN || process.env.GITHUB_TOKEN || process.env.GHT;
        const theme = process.env.INPUT_THEME || "dracula";
        const headerStyle = process.env.INPUT_HEADERSTYLE || "mac";
        const typingSpeed = parseInt(process.env.INPUT_TYPINGSPEED || "100", 10);
        const hostname = process.env.INPUT_HOSTNAME || "github.com";
        const commandsParam = process.env.INPUT_COMMANDS;
        const outputPath = process.env.INPUT_OUTPUTPATH || "github_stats.svg";
        const sourceType = process.env.INPUT_SOURCETYPE || "user";
        const target = process.env.INPUT_TARGET || username;

        if (!target) {
            throw new Error("Missing required input: 'username' or 'target' must be specified.");
        }

        // Construct customized configuration
        const configOverride = {
            theme: theme as ThemeName,
            headerStyle: headerStyle as "mac" | "windows" | "retro",
            hostname,
            typingSpeed,
            sourceType,
            target,
            commands: commandsParam 
                ? commandsParam.split(",").map(c => c.trim()).filter(Boolean)
                : ["whoami", "neofetch", "uptime", "exit"]
        };

        console.log(`[GitHub Action] Starting SVG Stats compilation...`);
        console.log(`[GitHub Action] Target: ${target} (${sourceType})`);
        console.log(`[GitHub Action] Theme: ${theme}`);
        console.log(`[GitHub Action] Output: ${outputPath}`);

        const styledSvg = await TerminalGeneratorEngine.generateSvgString(
            target,
            token,
            configOverride,
            sourceType as "user" | "repo"
        );

        const finalPath = path.resolve(process.cwd(), outputPath);
        
        // Ensure directories exist
        const dir = path.dirname(finalPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(finalPath, styledSvg);
        console.log(`[GitHub Action] Successfully compiled card to: ${finalPath}`);
    } catch (error: any) {
        console.error("::error::[GitHub Action] Execution failed:", error);
        process.exit(1);
    }
}

run();
