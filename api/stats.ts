import { IncomingMessage, ServerResponse } from "http";
import * as querystring from "querystring";
import { ThemeName } from "../src/constants/themes.constants";
import { TerminalGeneratorEngine } from "../src/services/TerminalGeneratorEngine";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const rawQuery = (req.url || "").split("?")[1] || "";
        const query = querystring.parse(rawQuery);

        // Extract query parameters
        const username = (query.username as string) || "";
        const theme = (query.theme as string) || "dracula";
        const headerStyle = (query.headerStyle as string) || "mac";
        const typingSpeed = parseInt((query.typingSpeed as string) || "100", 10);
        const hostname = (query.hostname as string) || "github.com";
        const commandsParam = query.commands as string | undefined;
        const sourceType = (query.sourceType as string) || "user";
        const target = (query.target as string) || username;
        const mock = query.mock === "true" || query.mock === "1";

        const customCmdsParam = query.customCommands as string | undefined;
        let customCommands = {};
        if (customCmdsParam) {
            try {
                customCommands = JSON.parse(customCmdsParam);
            } catch (e) {
                console.warn("Failed to parse customCommands:", e);
            }
        }

        // Validation
        if (!target) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Missing required 'username' or 'target' query parameter." }));
            return;
        }

        // Parse commands list
        let commandsList = ["whoami", "neofetch", "uptime", "exit"];
        if (commandsParam) {
            commandsList = commandsParam.split(",").map(c => c.trim()).filter(Boolean);
        }

        // Construct customized configuration override
        const configOverride = {
            theme: theme as ThemeName,
            headerStyle: headerStyle as "mac" | "windows" | "retro",
            hostname,
            typingSpeed,
            sourceType,
            target,
            commands: commandsList,
            customCommands
        };

        // Leverage server environment secrets if available
        const token = process.env.GHT || process.env.GITHUB_TOKEN || undefined;

        // Generate the SVG string in memory
        const svgString = await TerminalGeneratorEngine.generateSvgString(
            target,
            token,
            configOverride,
            sourceType as "user" | "repo",
            mock
        );

        // Configure edge-caching headers (Cache-Control: public, s-maxage=3600, stale-while-revalidate=1800)
        res.writeHead(200, {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=1800",
            "Access-Control-Allow-Origin": "*"
        });

        res.end(svgString);
    } catch (error: any) {
        console.error("Vercel Serverless API Error:", error);

        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            error: "Failed to generate dynamic terminal SVG.",
            details: error?.message || error
        }));
    }
}
