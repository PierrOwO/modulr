import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve the directory where the CLI package is installed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target the .env file located in the root directory of the CLI package
const cliRootDir = path.resolve(__dirname, '../..');
const cliEnvPath = path.join(cliRootDir, '.env');

// Initialize dotenv from the CLI package directory
dotenv.config({ path: cliEnvPath });

/**
 * Retrieves an environment variable in a dynamic Laravel-like style.
 * 
 * @param {string|null} key Variable key (e.g. 'VERSION', 'BACKEND_DIR')
 * @param {any} defaultValue Default value if the variable does not exist
 * @returns {any} Value from environment variables, the whole object, or defaultValue
 */
export function env(key = null, defaultValue = null) {
    // If called without arguments as env(), returns all variables from process.env
    if (!key) {
        return process.env;
    }

    // Dynamic retrieval directly from the loaded environment
    if (process.env[key] !== undefined && process.env[key] !== '') {
        return process.env[key];
    }

    return defaultValue;
}