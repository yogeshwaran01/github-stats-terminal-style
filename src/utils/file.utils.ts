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


/**
 * Loads a configuration JSON file if it exists in the current directory.
 * Searches for both '.github-stats-config.json' and 'github-stats-config.json'.
 * @returns Parsed configuration object or empty object.
 */
export function loadConfig(): Record<string, any> {
    const filenames = ['.github-stats-config.json', 'github-stats-config.json'];
    for (const filename of filenames) {
        const fullPath = path.resolve(process.cwd(), filename);
        if (fs.existsSync(fullPath)) {
            try {
                console.log(`Loading config from: ${fullPath}`);
                const content = fs.readFileSync(fullPath, 'utf-8');
                return JSON.parse(content);
            } catch (error) {
                console.error(`Error parsing config file ${filename}:`, error);
            }
        }
    }
    return {};
}

/**
 * Loads a configuration JSON file from a specific path.
 * @param filePath Path to the configuration file.
 * @returns Parsed configuration object or empty object.
 */
export function loadConfigFromPath(filePath: string): Record<string, any> {
    try {
        const fullPath = path.resolve(process.cwd(), filePath);
        if (fs.existsSync(fullPath)) {
            console.log(`Loading config from path: ${fullPath}`);
            const content = fs.readFileSync(fullPath, 'utf-8');
            return JSON.parse(content);
        }
    } catch (error) {
        console.error(`Error parsing config file at ${filePath}:`, error);
    }
    return {};
}

