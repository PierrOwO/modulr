import fs from 'fs/promises';
import path from 'path';
import { loadConfig, saveConfig } from '../utils/config.js';

/**
 * Downloads the entire .mm-stubs folder from the GitHub repository.
 */
async function downloadStubs() {
    const owner = 'PierrOwO';
    const repo = 'modulr';
    const branch = 'main';
    const targetFolder = '.mm-stubs';

    console.log('🔄 Fetching stubs structure from GitHub repository...');

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Modulr-CLI',
            },
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        
        const stubFiles = data.tree.filter(
            item => item.type === 'blob' && item.path.startsWith(targetFolder)
        );

        if (!stubFiles.length) {
            console.log('[!] No stub files found in the repository under .mm-stubs.');
            return;
        }

        console.log(`📦 Found ${stubFiles.length} stub files. Downloading...`);

        for (const file of stubFiles) {
            const relativePath = path.relative(targetFolder, file.path);
            const localFilePath = path.join(process.cwd(), targetFolder, relativePath);
            const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file.path}`;

            await fs.mkdir(path.dirname(localFilePath), { recursive: true });

            const fileRes = await fetch(rawUrl);
            if (!fileRes.ok) {
                console.error(`[X] Failed to download: ${file.path}`);
                continue;
            }

            const content = await fileRes.text();
            await fs.writeFile(localFilePath, content, 'utf8');
            console.log(` -> Downloaded: ${relativePath}`);
        }

        console.log('[OK] Stubs synchronized successfully.');
    } catch (err) {
        console.error('[X] Error while downloading stubs:', err.message);
    }
}

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

    // Automatically pull remote stubs from GitHub during setup
    try {
        await downloadStubs();
    } catch (err) {
        console.warn('[!] Warning: Could not download remote stubs automatically:', err.message);
    }
    
    console.log('[OK] Setup structure completed successfully.');
}