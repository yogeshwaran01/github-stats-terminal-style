import { Theme } from "./theme.types";

/**
 * Supported Visual Graphics Types for terminal displays.
 */
export type TerminalGraphicsType = 'text' | 'table' | 'chart' | 'list' | 'neoFetch' | 'barChart';

/**
 * Data model representing faked CLI table structures.
 */
export interface TableGraphicsData {
    headers: string[];
    rows: string[][];
    theme?: Theme;
}

/**
 * Data model representing faked ASCII line graphs.
 */
export interface ChartGraphicsData {
    data: number[];
    height?: number;
    theme?: Theme;
}

/**
 * Data model representing faked system telemetry details.
 */
export interface NeoFetchGraphicsData {
    title: {
        user: string;
        host: string;
    };
    info: Record<string, string>;
    theme?: Theme;
}

/**
 * Data model representing faked programming language items.
 */
export interface BarChartItem {
    name: string;
    percentage: number;
}
export type BarChartGraphicsData = BarChartItem[];

/**
 * Unified data contract representing allowed visual layout payload inputs.
 */
export type GraphicsDataContract = 
    | string 
    | TableGraphicsData 
    | ChartGraphicsData 
    | NeoFetchGraphicsData 
    | BarChartGraphicsData;
