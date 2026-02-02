/**
 * Represents a hexadecimal color string (e.g., "#ffffff").
 */
export type HexColor = `#${string}`;

/**
 * Represents the valid index keys for ANSI colors (0-15).
 */
export type ANSIIndex =
    | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7"
    | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15";

/**
 * Maps ANSI color indices to their hexadecimal references.
 */
export type ANSIColors = {
    [key in ANSIIndex]: HexColor;
};

/**
 * Defines the structure of a terminal theme.
 */
export interface Theme {
    /** The name of the theme. */
    name: string;
    /** The background color of the terminal. */
    background: HexColor;
    /** The default text color. */
    foreground: HexColor;
    /** The cursor color. */
    cursor: HexColor;
    /** The ANSI color palette. */
    colors: ANSIColors;
    /** Optional bold text color. */
    bold?: HexColor;
    /** Optional font size. */
    fontSize?: number;
    /** Optional font family. */
    fontFamily?: string;
}
