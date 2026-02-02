import { Theme } from "../types/theme.types";

/**
 * Collection of predefined terminal themes.
 * Each theme defines background, foreground, cursor, and a 16-color ANSI palette.
 */
export const THEMES = {
    dracula: {
        name: "dracula",
        background: "#282a36",
        foreground: "#f8f8f2",
        cursor: "#f8f8f2",
        colors: {
            "0": "#21222c", "1": "#ff5555", "2": "#50fa7b", "3": "#f1fa8c",
            "4": "#bd93f9", "5": "#ff79c6", "6": "#8be9fd", "7": "#f8f8f2",
            "8": "#6272a4", "9": "#ff6e6e", "10": "#69ff94", "11": "#ffffa5",
            "12": "#d6acff", "13": "#ff92df", "14": "#a4ffff", "15": "#ffffff"
        }
    },
    ubuntu: {
        name: "ubuntu",
        background: "#300a24",
        foreground: "#eeeeec",
        cursor: "#bbbbbb",
        colors: {
            "0": "#2e3436", "1": "#cc0000", "2": "#4e9a06", "3": "#c4a000",
            "4": "#3465a4", "5": "#75507b", "6": "#06989a", "7": "#d3d7cf",
            "8": "#555753", "9": "#ef2929", "10": "#8ae234", "11": "#fce94f",
            "12": "#729fcf", "13": "#ad7fa8", "14": "#34e2e2", "15": "#eeeeec"
        }
    },
    hacker: {
        name: "hacker",
        background: "#000000",
        foreground: "#00ff00",
        cursor: "#00ff00",
        colors: {
            "0": "#000000", "1": "#003300", "2": "#00ff00", "3": "#009900",
            "4": "#006600", "5": "#00cc00", "6": "#00ff66", "7": "#ccffcc",
            "8": "#333333", "9": "#00ff00", "10": "#00ff00", "11": "#00ff00",
            "12": "#00ff00", "13": "#00ff00", "14": "#00ff00", "15": "#ffffff"
        }
    },
    atom: {
        name: "atom",
        background: "#282c34",
        foreground: "#abb2bf",
        cursor: "#528bff",
        colors: {
            "0": "#282c34", "1": "#e06c75", "2": "#98c379", "3": "#d19a66",
            "4": "#61afef", "5": "#c678dd", "6": "#56b6c2", "7": "#abb2bf",
            "8": "#5c6370", "9": "#e06c75", "10": "#98c379", "11": "#d19a66",
            "12": "#61afef", "13": "#c678dd", "14": "#56b6c2", "15": "#ffffff"
        }
    },
    powershell: {
        name: "powershell",
        background: "#012456",
        foreground: "#cccccc",
        cursor: "#ffffff",
        colors: {
            "0": "#012456", "1": "#ee0000", "2": "#00ee00", "3": "#eeee00",
            "4": "#0000ee", "5": "#ee00ee", "6": "#00eeee", "7": "#cccccc",
            "8": "#808080", "9": "#ff0000", "10": "#00ff00", "11": "#ffff00",
            "12": "#5c5cff", "13": "#ff00ff", "14": "#00ffff", "15": "#ffffff"
        }
    },
    monokai: {
        name: "monokai",
        background: "#272822",
        foreground: "#f8f8f2",
        cursor: "#f8f8f2",
        colors: {
            "0": "#272822", "1": "#f92672", "2": "#a6e22e", "3": "#f4bf75",
            "4": "#66d9ef", "5": "#ae81ff", "6": "#a1efe4", "7": "#f8f8f2",
            "8": "#75715e", "9": "#f92672", "10": "#a6e22e", "11": "#f4bf75",
            "12": "#66d9ef", "13": "#ae81ff", "14": "#a1efe4", "15": "#f9f8f5"
        }
    },
    github: {
        name: "github",
        background: "#ffffff",
        foreground: "#24292e",
        cursor: "#24292e",
        colors: {
            "0": "#24292e", "1": "#d73a49", "2": "#28a745", "3": "#dbab09",
            "4": "#0366d6", "5": "#6f42c1", "6": "#0598bc", "7": "#6a737d",
            "8": "#959da5", "9": "#cb2431", "10": "#22863a", "11": "#b08800",
            "12": "#005cc5", "13": "#5a32a3", "14": "#3192aa", "15": "#d1d5da"
        }
    }
} as const satisfies Record<string, Theme>;

/**
 * Union type of all available theme names (e.g., 'dracula', 'ubuntu').
 */
export type ThemeName = keyof typeof THEMES;
