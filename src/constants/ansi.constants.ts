/**
 * ANSI escape codes and helpers for terminal text styling.
 */
export const ANSI = {
    /** Reset all styles. */
    reset: '\x1b[0m',
    /** Bold text. */
    bold: '\x1b[1m',
    /** Underlined text. */
    underline: '\x1b[4m',
    /** Black text color. */
    black: '\x1b[30m',
    /** White text color. */
    white: '\x1b[37m',
    /** Yellow text color. */
    yellow: '\x1b[33m',

    /**
     * Formats a label with yellow color and a colon, followed by reset.
     * @param text The label text.
     */
    label: (text: string) => `\x1b[33m${text}:\x1b[0m`,

    /**
     * Wraps text in a specific color code and resets at the end.
     * @param text The text to color.
     * @param colorCode The ANSI color code to apply.
     */
    color: (text: string, colorCode: string) => `${colorCode}${text}${ANSI.reset}`,

    /** Green text color. */
    green: "\x1b[32m",
    /** Purple text color. */
    purple: "\x1b[35m",
    /** Cyan text color. */
    cyan: "\x1b[36m",
    /** Red text color. */
    red: '\x1b[31m',
    /** Blue text color. */
    blue: '\x1b[34m',
    /** Magenta text color. */
    magenta: '\x1b[35m',
    /** Gray text color. */
    gray: '\x1b[90m',
};
