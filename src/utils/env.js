import dotenv from 'dotenv';
import path from 'path';

// Initialize dotenv once upon module import
dotenv.config({ path: path.join(process.cwd(), '.env') });

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