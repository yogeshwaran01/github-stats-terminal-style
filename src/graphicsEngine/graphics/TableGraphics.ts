import Table = require('cli-table3');
import { ANSI } from "../../constants/ansi.constants";
import { Theme } from "../../types/theme.types";
import { TerminalGraphics } from "../TerminalGraphics";
import { TerminalGraphicsType, TableGraphicsData, GraphicsDataContract } from "../../types/graphics.types";

/**
 * Visual Formatter that renders CLI tables using cli-table3.
 */
export class TableGraphics implements TerminalGraphics {
    public readonly type: TerminalGraphicsType = "table";

    public format(data: GraphicsDataContract, theme: Theme): string {
        const tableData = data as TableGraphicsData;
        const coloredHeaders = tableData.headers.map(header => ANSI.color(header, ANSI.bold));

        const table = new Table({
            head: coloredHeaders,
        });

        tableData.rows.forEach(row => table.push(row as any));
        return table.toString();
    }
}
