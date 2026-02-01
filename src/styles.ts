import Table = require('cli-table3');
import { ANSI } from './ascii';
import { Theme } from './themes';
import asciichart = require('asciichart');
import fs = require('fs');

export interface TableOptions<T> {
    headers: string[];
    rows: T[];
    theme: Theme;
}

export interface ChartOptions {
    data: number[];
    height?: number;
    theme: Theme;
}

export interface NeoFetchInfo {
    username: string;
    hostname: string;
    os: string;
    kernel: string;
    uptime: string;
    shell: string;
    cpu: string;
    memory: string;
    theme: Theme;
}

export function renderTable<T>({ headers, rows }: TableOptions<T>) {
    headers.forEach((header, index) => {
        headers[index] = ANSI.color(header, ANSI.bold);
    });
    const table = new Table({
        head: headers,
    });
    rows.forEach(row => table.push(row as any));
    return table.toString();
}

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

export function renderList(items: string[], bullet = '-') {
    return items.map(item => ` ${bullet} ${item}`).join('\n');
}

function loadLogo(path: string, color: string): string[] {
    return fs
        .readFileSync(path, 'utf-8')
        .split('\n')
        .map(line => `${color}${line}`);
}


export function renderNeoFetch(
    info: NeoFetchInfo
) {
    const lines = [
        `${ANSI.yellow}${info.username}${ANSI.reset}@${ANSI.yellow}${info.hostname}`,
        ANSI.reset,
        prepareLine(info),
        `${ANSI.label('OS')} ${info.os}`,
        `${ANSI.label('Kernel')} ${info.kernel}`,
        `${ANSI.label('Uptime')} ${info.uptime}`,
        `${ANSI.label('Shell')} ${info.shell}`,
        `${ANSI.label('CPU')} ${info.cpu}`,
        `${ANSI.label('Memory')} ${info.memory}`
    ];
    const logo = loadLogo('assets/github_art.txt', ANSI.purple || "white");
    const max = Math.max(logo.length, lines.length);
    return Array.from({ length: max }, (_, i) =>
        `${logo[i] ?? ' '.repeat(15)}  ${lines[i] ?? ''}`
    ).join('\n');
}
/**
 * prepare the line for neofetch
 * Length of line should match the above line characters
 * @param info <NeoFetchInfo> NeoFetch information
 */
function prepareLine(info: NeoFetchInfo): string {
    let line: string = `${ANSI.yellow}`;
    const content = `${info.username}@${info.hostname}`;
    for (let i = 0; i < content.length; i++) {
        line += `-`;
    }
    return line;
}
