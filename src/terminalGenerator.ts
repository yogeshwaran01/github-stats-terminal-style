import { render as renderTerminal, SvgTermColor, SvgTermOptions } from "svg-term";
import { ANSI } from "./ascii";
import { renderChart, renderList, renderNeoFetch, renderTable } from "./styles";
import { Theme, ThemeName, THEMES } from "./themes";

/**
 * Configuration options for the TerminalGenerator
 */
export interface TerminalConfig {
    userName: string;
    theme: ThemeName;
    typingSpeed: number;
    hostname: string;
    width?: number;
    height?: number;
}

/**
 * TerminalGenerator class to create terminal-like SVG outputs
 */
export class TerminalGenerator {

    //#region Private Members
    // Constructor parameters
    private options: TerminalConfig
    // Recorded events for asciicast
    private events: Array<any> = [];
    // The current timestamp in seconds for the asciicast recording
    private currentTime: number = 0;
    // Theme for styling the terminal
    private theme: Theme;
    //#endregion

    //#region Constructor
    /**
     * Constructor
     * @param config <TerminalConfig> Configuration options for the terminal generator
     */
    constructor(config: TerminalConfig) {
        this.options = config;
        this.theme = THEMES[config.theme]
        if (!this.theme) { this.theme = THEMES.dracula; }
    }
    //#endregion

    //#region Public Methods
    /**
     * Helper method to add a command and its output to the terminal session
     * @param commandText The command text to be executed
     * @param outputData The output data to be displayed
     * @param _outputType The type of output (text, table, chart, etc.)
     * @returns This TerminalGenerator instance for chaining
     */
    public addCommand(commandText: string, outputData: any, _outputType: string = "text") {
        const prompt = this.createPrompt();
        this.record(prompt);
        this.wait(0.2);
        this.recordCommandText(commandText);
        this.wait(0.2);
        this.record("\r\n");
        this.wait(0.5);
        const output: string = this.PrepareFormattedOutput(outputData, _outputType)
        this.recordOutput(output);
        this.wait(1.0);
        return this;
    }
    /**
     * Helps to render the recorded terminal session into an SVG format
     * @returns svg Content
     */
    public render(): string {
        const header = {
            version: 2,
            width: 80,
            height: 24,
            timestamp: Date.now(),
            env: { TERM: "xterm-256color" }
        };

        const eventLines = this.events.map(e => JSON.stringify(e)).join('\n');
        const asciicastV2Data = JSON.stringify(header) + '\n' + eventLines;
        const options: SvgTermOptions = this.prepareHeader();
        try {
            const svgContent = renderTerminal(asciicastV2Data, options);
            return svgContent;
        } catch (err: any) {
            console.error("Failed to render SVG:", err);
        }
    }
    //#endregion

    //#region Private Methods
    /**
     * Helps to record command text with typing effect
     * @param commandText Command text
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
     * Helps to prepare header options for svg-term rendering
     * @returns <SvgTermOptions> Options for svg-term rendering
     */
    private prepareHeader(): SvgTermOptions {
        return {
            width: this.options.width || 80,
            height: this.options.height || 20,
            window: true,
            cursor: true,
            theme: this.getThemeObject(this.options.theme || "dracula"),
            to: this.events.length > 0 ? this.events[this.events.length - 1][0] : 0
        };
    }
    /**
     * Helps to record output line by line with a slight delay
     * @param output Output string
     */
    private recordOutput(output: string) {
        output.split('\n').forEach(line => {
            this.record(line + "\r\n");
            this.wait(0.02);
        });
    }
    /**
     * Helps to prepare formatted output based on the output type
     * @param outputData Output data
     * @param outputType output type (text, table, chart, etc.)
     * @returns Formatted output string
     */
    private PrepareFormattedOutput(outputData: any, outputType: string): string {
        let formattedOutput = "";
        if (outputType != "text") {
            outputData.theme = this.theme;
        }
        switch (outputType) {
            case 'table':
                formattedOutput = renderTable(outputData);
                break;
            case 'chart':
                formattedOutput = renderChart(outputData);
                break;
            case 'list':
                formattedOutput = renderList(outputData);
                break;
            case 'neoFetch':
                formattedOutput = renderNeoFetch(outputData);
                break;
            default:
                formattedOutput = typeof outputData === 'string' ? outputData : JSON.stringify(outputData);
        }
        return formattedOutput;
    }
    /**
     * Helps to record an event in the asciicast format
     * @param data Data to record
     */
    private record(data: any) {
        this.events.push([this.currentTime, "o", data]);
    }
    /**
     * Helps to wait for a specified number of seconds
     * @param seconds Seconds to wait
     */
    private wait(seconds: number) {
        this.currentTime += seconds;
    }
    /**
     * Helps to create the terminal prompt string
     * @returns Prompt string
     */
    private createPrompt(): string {

        return `${ANSI.purple}${this.options.userName}@${this.options.hostname}${ANSI.reset}:${ANSI.cyan}~${ANSI.reset}${ANSI.green}$${ANSI.reset} `;
    }
    /**
     * Helps to get the theme object for svg-term
     * @param name Theme name
     * @returns Theme object for svg-term
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
            background: toRgb(rawTheme?.background),
            text: toRgb(rawTheme?.foreground),
            cursor: toRgb(rawTheme?.cursor),
            bold: toRgb(rawTheme?.foreground),

            0: toRgb(rawTheme?.colors["0"]),
            1: toRgb(rawTheme?.colors["1"]),
            2: toRgb(rawTheme?.colors["2"]),
            3: toRgb(rawTheme?.colors["3"]),
            4: toRgb(rawTheme?.colors["4"]),
            5: toRgb(rawTheme?.colors["5"]),
            6: toRgb(rawTheme?.colors["6"]),
            7: toRgb(rawTheme?.colors["7"]),
            8: toRgb(rawTheme?.colors["8"]),
            9: toRgb(rawTheme?.colors["9"]),
            10: toRgb(rawTheme?.colors["10"]),
            11: toRgb(rawTheme?.colors["11"]),
            12: toRgb(rawTheme?.colors["12"]),
            13: toRgb(rawTheme?.colors["13"]),
            14: toRgb(rawTheme?.colors["14"]),
            15: toRgb(rawTheme?.colors["15"])
        };
    }
    //#endregion

}