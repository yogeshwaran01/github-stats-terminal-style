import asciichart = require('asciichart');
import { Theme } from "../../types/theme.types";
import { TerminalGraphics } from "../TerminalGraphics";
import { TerminalGraphicsType, ChartGraphicsData, GraphicsDataContract } from "../../types/graphics.types";

/**
 * Visual Formatter that renders ASCII line graphs.
 */
export class ChartGraphics implements TerminalGraphics {
    public readonly type: TerminalGraphicsType = "chart";

    public format(data: GraphicsDataContract, theme: Theme): string {
        const chartData = data as ChartGraphicsData;
        const height = chartData.height || 10;
        
        return asciichart.plot(chartData.data, {
            height,
            colors: Object.values(theme.colors)
        });
    }
}
