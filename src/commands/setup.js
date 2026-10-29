import fs from 'fs/promises';
import path from 'path';
import { loadConfig, saveConfig } from '../utils/config.js';

export async function runSetupCommand() {
    console.log('Initializing Modular Monolith environment...');
    
    const cfg = await loadConfig();
    await saveConfig(cfg);

    const stubsDir = path.join(process.cwd(), '.mm-stubs');
    await fs.mkdir(stubsDir, { recursive: true });

    const registryPath = path.join(process.cwd(), 'modules.json');
    try {
        await fs.access(registryPath);
    } catch {
        await fs.writeFile(registryPath, JSON.stringify({ modules: [] }, null, 2), 'utf8');
    }
    
    console.log('[OK] Setup structure completed successfully.');
}