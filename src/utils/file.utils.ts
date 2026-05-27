import fs = require('fs');
import path = require('path');

/**
 * Loads a logo from a file and applies color.
 * Supports absolute resolution, relative path detection, and built-in fallback.
 * @param filePath Path to the logo file.
 * @param color ANSI color code to apply.
 * @returns Array of colored strings.
 */
export function loadLogo(filePath: string, color: string): string[] {
    try {
        // 1. Try to resolve path relative to process.cwd() or absolute path
        let resolvedPath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
        
        // 2. Fallback: try resolving relative to the directory of this file (handles bundling differences)
        if (!fs.existsSync(resolvedPath)) {
            resolvedPath = path.resolve(__dirname, '../../', filePath);
        }
        
        if (fs.existsSync(resolvedPath)) {
            return fs
                .readFileSync(resolvedPath, 'utf-8')
                .split('\n')
                .map(line => `${color}${line}`);
        }
    } catch (error) {
        console.error(`Error loading logo from ${filePath}:`, error);
    }
    
    // 3. Robust Ultimate Fallback: Return standard GitHub Octocat ASCII art colored cleanly
    const fallbackLogo = [
        "          ████████          ",
        "       ██████████████       ",
        "     ███  ████████  ███     ",
        "    ████            ████    ",
        "    ████            ████    ",
        "    ███              ███    ",
        "    ████            ████    ",
        "    █████          █████    ",
        "     ██ ████    ███████     ",
        "      ██         █████      ",
        "         ██      ██         "
    ];
    return fallbackLogo.map(line => `${color}${line}`);
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

