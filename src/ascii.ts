/**
 * ANSI escape codes for terminal text styling.
 */
export const ANSI = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    underline: '\x1b[4m',
    black: '\x1b[30m',
    white: '\x1b[37m',
    yellow: '\x1b[33m',
    label: (text: string) => `\x1b[33m${text}:\x1b[0m`,
    color: (text: string, colorCode: string) => `${colorCode}${text}${ANSI.reset}`,
    green: "\x1b[32m",
    purple: "\x1b[35m",
    cyan: "\x1b[36m",
    red: '\x1b[31m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    gray: '\x1b[90m',
};
