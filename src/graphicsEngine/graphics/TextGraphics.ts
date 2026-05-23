import { Theme } from "../../types/theme.types";
import { TerminalGraphics } from "../TerminalGraphics";
import { TerminalGraphicsType, GraphicsDataContract } from "../../types/graphics.types";

/**
 * Default visual formatter that outputs standard string outputs.
 */
export class TextGraphics implements TerminalGraphics {
    public readonly type: TerminalGraphicsType = "text";

    public format(data: GraphicsDataContract, theme: Theme): string {
        return typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    }
}
