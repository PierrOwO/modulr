import fs from 'fs';
import path from 'path';
import { env } from './env.js';

const CONFIG_FILE = 'mm.config.json';
const configPath = path.join(process.cwd(), CONFIG_FILE);

const DEFAULT_CONFIG = {
  env: env('ENV', 'development'),
  version: env('VERSION', 'null'),
  backendDir: env('BACKEND_DIR', 'app/Modules'),
  frontendDir: env('FRONTEND_DIR', 'resources/js/Modules'),
  stubsUrl: env('STUBS_GIT_URL', 'https://raw.githubusercontent.com/PierrOwO/modulr/main/.mm-stubs'),
  ai: {
    enabled: Boolean(env('AI_API_TOKEN', '')),
  }
};

export function loadConfig() {
    try {
        if (fs.existsSync(configPath)) {
            const data = fs.readFileSync(configPath, 'utf8');
            return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
        }
    } catch {}

    saveConfig(DEFAULT_CONFIG);
    return DEFAULT_CONFIG;
}

export function saveConfig(newConfig) {
    const merged = { ...DEFAULT_CONFIG, ...newConfig };
    try {
        fs.writeFileSync(configPath, JSON.stringify(merged, null, 2), 'utf8');
        reloadConfig(); 
    } catch (err) {
        console.error('[X] Error saving configuration file:', err.message);
    }
    return merged;
}

let currentConfig = loadConfig();

export function reloadConfig() {
    currentConfig = loadConfig();
    Object.assign(config, currentConfig);
    return currentConfig;
}

/**
 * Main `config` function, which also acts as an object with properties (e.g. config.backendDir).
 */
function configHandler(key = null) {
    if (!key) return currentConfig;

    const keys = key.split('.');
    let result = currentConfig;

    for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
            result = result[k];
        } else {
            return null;
        }
    }

    return result !== undefined ? result : null;
}


export const config = Object.assign(configHandler, currentConfig);