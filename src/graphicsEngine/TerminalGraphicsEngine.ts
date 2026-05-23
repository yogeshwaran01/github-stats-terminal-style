import { Theme } from "../types/theme.types";
import { TerminalGraphicsRegistry } from "./TerminalGraphicsRegistry";
import { TerminalGraphicsType, GraphicsDataContract } from "../types/graphics.types";

/**
 * Orchestrator representing the complete console formatting engine.
 * Maps output widgets to faked console outputs dynamically.
 */
export class TerminalGraphicsEngine {
    /**
     * Styles and compiles a faked terminal console output block.
     * 
     * @param data The raw strictly-contracted data payload.
     * @param type The visual graphics type descriptor.
     * @param theme The current visual theme configuration.
     * @returns The faked console text string ready to type into the shell.
     */
    public static format(data: GraphicsDataContract, type: TerminalGraphicsType, theme: Theme): string {
        const formatter = TerminalGraphicsRegistry.getFormatter(type);
        return formatter.format(data, theme);
    }
}
