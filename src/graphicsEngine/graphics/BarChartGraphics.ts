import { Theme } from "../../types/theme.types";
import { TerminalGraphics } from "../TerminalGraphics";
import { TerminalGraphicsType, BarChartGraphicsData, GraphicsDataContract } from "../../types/graphics.types";

/**
 * Visual Formatter that renders ASCII horizontal percentage bar charts.
 */
export class BarChartGraphics implements TerminalGraphics {
    public readonly type: TerminalGraphicsType = "barChart";

    public format(data: GraphicsDataContract, theme: Theme): string {
        const items = data as BarChartGraphicsData;
        const barWidth = 20;

        if (!items || items.length === 0) return " No language data available.";
        
        const maxNameLen = Math.max(...items.map(item => item.name.length), 0);
        return items.map(item => {
            const paddedName = item.name.padEnd(maxNameLen + 2, ' ');
            const filledChars = Math.max(0, Math.min(barWidth, Math.round((item.percentage / 100) * barWidth)));
            const emptyChars = Math.max(0, barWidth - filledChars);
            const bar = '█'.repeat(filledChars) + '░'.repeat(emptyChars);
            const percentageString = `${item.percentage}%`.padStart(4, ' ');
            
            return ` ${paddedName}[${bar}] ${percentageString}`;
        }).join('\n');
    }
}
