import { TerminalGraphics } from "./TerminalGraphics";
import { TerminalGraphicsType } from "../types/graphics.types";
import { TableGraphics } from "./graphics/TableGraphics";
import { ChartGraphics } from "./graphics/ChartGraphics";
import { ListGraphics } from "./graphics/ListGraphics";
import { NeoFetchGraphics } from "./graphics/NeoFetchGraphics";
import { BarChartGraphics } from "./graphics/BarChartGraphics";
import { TextGraphics } from "./graphics/TextGraphics";

/**
 * Static registry of all supported console formatters and visual graphics.
 */
export class TerminalGraphicsRegistry {
    private static readonly formatters: Map<TerminalGraphicsType, TerminalGraphics> = new Map<TerminalGraphicsType, TerminalGraphics>([
        ["table", new TableGraphics()],
        ["chart", new ChartGraphics()],
        ["list", new ListGraphics()],
        ["neoFetch", new NeoFetchGraphics()],
        ["barChart", new BarChartGraphics()],
        ["text", new TextGraphics()]
    ]);

    /**
     * Resolves a visual formatter corresponding to the given type.
     * Instantiates a dynamic TextGraphics fallback if the formatter isn't recognized.
     * 
     * @param type The visual output formatting descriptor (e.g. 'table', 'barChart').
     * @returns Concrete TerminalGraphics instance.
     */
    public static getFormatter(type: TerminalGraphicsType): TerminalGraphics {
        const formatter = this.formatters.get(type);
        if (formatter) {
            return formatter;
        }
        return new TextGraphics();
    }
}
