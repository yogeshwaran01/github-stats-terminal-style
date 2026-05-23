import { Theme } from "../../types/theme.types";
import { TerminalGraphics } from "../TerminalGraphics";
import { TerminalGraphicsType, GraphicsDataContract } from "../../types/graphics.types";

/**
 * Visual Formatter that renders clean bulleted console lists.
 */
export class ListGraphics implements TerminalGraphics {
    public readonly type: TerminalGraphicsType = "list";

    public format(data: GraphicsDataContract, theme: Theme): string {
        const items = Array.isArray(data) ? data : [data.toString()];
        const bullet = '-';
        return items.map(item => ` ${bullet} ${item}`).join('\n');
    }
}
