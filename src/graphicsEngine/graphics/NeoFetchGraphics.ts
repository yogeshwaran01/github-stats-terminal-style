import { ANSI } from "../../constants/ansi.constants";
import { loadLogo } from "../../utils/file.utils";
import { Theme } from "../../types/theme.types";
import { TerminalGraphics } from "../TerminalGraphics";
import { TerminalGraphicsType, NeoFetchGraphicsData, GraphicsDataContract } from "../../types/graphics.types";

/**
 * Visual Formatter that renders faked NeoFetch telemetry blocks.
 */
export class NeoFetchGraphics implements TerminalGraphics {
    public readonly type: TerminalGraphicsType = "neoFetch";

    public format(data: GraphicsDataContract, theme: Theme): string {
        const info = data as NeoFetchGraphicsData;
        const infoLines = Object.entries(info.info).map(([key, value]) => {
            return `${ANSI.label(key)} ${value}`;
        });

        const lines = [
            `${ANSI.yellow}${info.title.user}${ANSI.reset}@${ANSI.yellow}${info.title.host}`,
            ANSI.reset,
            this.prepareLine(info),
            ...infoLines
        ];

        const logoPath = 'assets/github_art.txt';
        // Map ANSI green color in the text logo
        const logo = loadLogo(logoPath, ANSI.green);

        const max = Math.max(logo.length, lines.length);
        return Array.from({ length: max }, (_, i) =>
            `${logo[i] ?? ' '.repeat(15)}  ${lines[i] ?? ''}`
        ).join('\n');
    }

    /**
     * Prepares the separator line for NeoFetch style.
     * Matches the length of the 'username@hostname' string.
     */
    private prepareLine(info: NeoFetchGraphicsData): string {
        let line: string = `${ANSI.yellow}`;
        const content = `${info.title.user}@${info.title.host}`;
        for (let i = 0; i < content.length; i++) {
            line += `-`;
        }
        return line;
    }
}
