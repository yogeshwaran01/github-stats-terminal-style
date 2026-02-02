import fs = require('fs');
import path = require('path');

/**
 * Loads a logo from a file and applies color.
 * @param filePath Path to the logo file.
 * @param color ANSI color code to apply.
 * @returns Array of colored strings.
 */
export function loadLogo(filePath: string, color: string): string[] {
    try {
        // Resolve path relative to CWD to match original behavior, 
        // or check if it exists. 
        // Original code used 'assets/github_art.txt' directly.
        return fs
            .readFileSync(filePath, 'utf-8')
            .split('\n')
            .map(line => `${color}${line}`);
    } catch (error) {
        console.error(`Error loading logo from ${filePath}:`, error);
        return [];
    }
}
