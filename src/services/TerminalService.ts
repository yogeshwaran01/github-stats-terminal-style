import { render as renderTerminal, SvgTermColor, SvgTermOptions } from "svg-term";
import { ANSI } from "../constants/ansi.constants";
import { ThemeName, THEMES } from "../constants/themes.constants";
import { TerminalConfig } from "../types/terminal.types";
import { Theme } from "../types/theme.types";
import { TerminalGraphicsEngine } from "../graphicsEngine/TerminalGraphicsEngine";
import { TerminalGraphicsType, GraphicsDataContract } from "../types/graphics.types";

/**
 * Service to orchestrate terminal session recording and SVG generation.
 */
export class TerminalService {

    private options: TerminalConfig;
    private events: Array<any> = [];
    private currentTime: number = 0;
    private theme: Theme;
    private lineCount: number = 0;

    /**
     * Initializes a new instance of the TerminalService.
     * @param config The configuration for the terminal (user, theme, speed, etc.).
     */
    constructor(config: TerminalConfig) {
        this.options = config;
        this.theme = THEMES[config.theme] || THEMES.dracula;
    }

    /**
     * Adds a simulated command entry to the terminal session.
     * 1. Renders the prompt.
     * 2. Simulates typing the command.
     * 3. Executes the command (displays output with a delay).
     * 
     * @param commandText The command to simulate typing (e.g. "whoami").
     * @param outputData The data to render as output.
     * @param outputType The format of the output ("text", "table", "chart", "neoFetch", "list").
     * @returns The TerminalService instance for method chaining.
     */
    public addCommand(commandText: string, outputData: GraphicsDataContract, outputType: TerminalGraphicsType = "text") {
        const prompt = this.createPrompt();
        this.record(prompt);
        this.wait(0.2);
        this.recordCommandText(commandText);
        this.wait(0.2);
        this.record("\r\n");
        this.wait(0.5);
        const output: string = this.prepareFormattedOutput(outputData, outputType);
        this.recordOutput(output);
        this.wait(1.0);
        return this;
    }

    /**
     * Generates an SVG string representation of the recorded terminal session.
     * @returns The generated SVG code.
     */
    public render(): string {
        // Automatically scale height based on exact line count written to fit perfectly without cutoffs!
        const calculatedHeight = Math.max(16, this.lineCount + 3);
        this.options.height = calculatedHeight;

        const header = {
            version: 2,
            width: this.options.width || 80,
            height: this.options.height,
            timestamp: Date.now(),
            env: { TERM: "xterm-256color" }
        };
        this.events.push([this.currentTime, "o", "\r\n"]);
        const eventLines = this.events.map(e => JSON.stringify(e)).join('\n');
        const asciicastV2Data = JSON.stringify(header) + '\n' + eventLines;
        const options: SvgTermOptions = this.prepareHeader();

        try {
            return renderTerminal(asciicastV2Data, options);
        } catch (err) {
            console.error("Failed to render SVG:", err);
            return "";
        }
    }

    /**
     * Simulates typing a command character by character.
     * @param commandText The text to type.
     */
    private recordCommandText(commandText: string) {
        if (commandText.length > 0) {
            for (const char of commandText) {
                this.record(char);
                this.wait(this.options.typingSpeed / 1000);
            }
        }
    }

    /**
     * Prepares the global header options for the SvgTerm renderer.
     * @returns SvgTermOptions object.
     */
    private prepareHeader(): SvgTermOptions {
        const isRetro = this.options.headerStyle === 'retro';
        return {
            width: this.options.width || 80,
            height: this.options.height || 20,
            window: !isRetro,
            cursor: true,
            theme: this.getThemeObject(this.options.theme || "dracula"),
            to: this.events.length > 0 ? this.events[this.events.length - 1][0] : 0,
        };
    }

    /**
     * Records the output execution loop, splitting by newlines.
     * @param output The full output string to record.
     */
    private recordOutput(output: string) {
        output.split('\n').forEach(line => {
            this.record(line + "\r\n");
            this.wait(0.02);
        });
    }

    private prepareFormattedOutput(outputData: GraphicsDataContract, outputType: TerminalGraphicsType): string {
        return TerminalGraphicsEngine.format(outputData, outputType, this.theme);
    }


    /**
     * Pushes a single event frame to the events list.
     * @param data The data (usually a string char or escape code) to record.
     */
    private record(data: any) {
        if (typeof data === "string") {
            const matches = data.match(/\n/g);
            if (matches) {
                this.lineCount += matches.length;
            }
        }
        this.events.push([this.currentTime, "o", data]);
    }

    /**
     * Increments the internal timer to simulate delay.
     * @param seconds Number of seconds to wait.
     */
    private wait(seconds: number) {
        this.currentTime += seconds;
    }

    /**
     * Creates a colored prompt string like `user@host:~ $`.
     * @returns Styled prompt string.
     */
    private createPrompt(): string {
        return `${ANSI.purple}${this.options.userName}@${this.options.hostname}${ANSI.reset}:${ANSI.cyan}~${ANSI.reset}${ANSI.green}$${ANSI.reset} `;
    }

    /**
     * Converts a Theme Config object into the format required by SvgTerm.
     * @param name The name of the theme to load.
     * @returns A compatible theme object for SvgTerm.
     */
    private getThemeObject(name: ThemeName): any {
        const rawTheme: Theme = THEMES[name] || THEMES.dracula;
        const toRgb = (hex: string): SvgTermColor => {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return [r, g, b];
        };
        return {
            background: toRgb(rawTheme.background),
            text: toRgb(rawTheme.foreground),
            cursor: toRgb(rawTheme.cursor),
            bold: toRgb(rawTheme.foreground),

            0: toRgb(rawTheme.colors["0"]),
            1: toRgb(rawTheme.colors["1"]),
            2: toRgb(rawTheme.colors["2"]),
            3: toRgb(rawTheme.colors["3"]),
            4: toRgb(rawTheme.colors["4"]),
            5: toRgb(rawTheme.colors["5"]),
            6: toRgb(rawTheme.colors["6"]),
            7: toRgb(rawTheme.colors["7"]),
            8: toRgb(rawTheme.colors["8"]),
            9: toRgb(rawTheme.colors["9"]),
            10: toRgb(rawTheme.colors["10"]),
            11: toRgb(rawTheme.colors["11"]),
            12: toRgb(rawTheme.colors["12"]),
            13: toRgb(rawTheme.colors["13"]),
            14: toRgb(rawTheme.colors["14"]),
            15: toRgb(rawTheme.colors["15"])
        };
    }
}


