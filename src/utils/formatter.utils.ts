import Table = require('cli-table3');
import asciichart = require('asciichart');
import { ANSI } from '../config/ansi.config';
import { Theme } from '../types/theme.types';
import { loadLogo } from './file.utils';

/**
 * Options for rendering a table.
 * @template T The type of data in the rows.
 */
export interface TableOptions<T> {
    /** List of header strings. */
    headers: string[];
    /** Array of row data. */
    rows: T[];
    /** The theme used for styling (optional context). */
    theme?: Theme;
}

/**
 * Options for rendering a chart.
 */
export interface ChartOptions {
    /** Array of numerical data points. */
    data: number[];
    /** Height of the chart in lines. */
    height?: number;
    /** The theme used for chart colors. */
    theme: Theme;
}

/**
 * Information required to render a NeoFetch-style summary.
 */
export interface NeoFetchInfo {
    /** The user and host info for the title line (e.g. user@host). */
    title: {
        user: string;
        host: string;
    };
    /** Key-value pairs of system information to display. */
    info: Record<string, string>;
    theme?: Theme;
}

/**
 * Renders a CLI table with colored headers.
 * @param options TableOptions containing headers and rows.
 * @returns The formatted table string.
 */
export function renderTable<T>({ headers, rows }: TableOptions<T>) {
    const coloredHeaders = headers.map(header => ANSI.color(header, ANSI.bold));

    const table = new Table({
        head: coloredHeaders,
    });

    rows.forEach(row => table.push(row as any));
    return table.toString();
}

/**
 * Renders an ASCII chart from data.
 * @param options ChartOptions containing data, height, and theme.
 * @returns The ASCII chart string.
 */
export function renderChart({
    data,
    height = 10,
    theme
}: ChartOptions) {
    return asciichart.plot(data, {
        height,
        colors: Object.values(theme.colors)
    });
}

/**
 * Renders a simple list of items with bullets.
 * @param items List of strings to display.
 * @param bullet The bullet character (default: '-').
 * @returns The formatted list string.
 */
export function renderList(items: string[], bullet = '-') {
    return items.map(item => ` ${bullet} ${item}`).join('\n');
}

/**
 * Renders a NeoFetch-style system information summary with ASCII logo.
 * @param info Object containing title info and dynamic key-value pairs.
 * @returns The formatted multi-line string.
 */
export function renderNeoFetch(info: NeoFetchInfo) {
    const infoLines = Object.entries(info.info).map(([key, value]) => {
        return `${ANSI.label(key)} ${value}`;
    });

    const lines = [
        `${ANSI.yellow}${info.title.user}${ANSI.reset}@${ANSI.yellow}${info.title.host}`,
        ANSI.reset,
        prepareLine(info),
        ...infoLines
    ];

    const logoPath = 'assets/github_art.txt';
    const logo = loadLogo(logoPath, ANSI.green);

    const max = Math.max(logo.length, lines.length);
    return Array.from({ length: max }, (_, i) =>
        `${logo[i] ?? ' '.repeat(15)}  ${lines[i] ?? ''}`
    ).join('\n');
}

/**
 * Prepares the separator line for NeoFetch style.
 * Matches the length of the 'username@hostname' string.
 * @param info The NeoFetch information object.
 * @returns A string of underscores/dashes matching the length.
 */
function prepareLine(info: NeoFetchInfo): string {
    let line: string = `${ANSI.yellow}`;
    const content = `${info.title.user}@${info.title.host}`;
    for (let i = 0; i < content.length; i++) {
        line += `-`;
    }
    return line;
}
