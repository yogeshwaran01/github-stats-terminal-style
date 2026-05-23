import { Theme } from "../types/theme.types";
import { TerminalGraphicsType, GraphicsDataContract } from "../types/graphics.types";

/**
 * Interface representing a terminal graphic formatter.
 * Concrete formatting classes implement this contract to render custom terminal graphics 
 * (such as charts, tables, lists, or neofetch-style telemetry bars).
 */
export interface TerminalGraphics {
    /** The visual graphics type descriptor. */
    readonly type: TerminalGraphicsType;
    /**
     * Renders and styles the faked terminal output string.
     * @param data The raw strictly-contracted data payload.
     * @param theme The current visual theme configuration.
     * @returns The styled console text string ready to print in the shell.
     */
    format(data: GraphicsDataContract, theme: Theme): string;
}
