import fs from 'fs/promises';
import path from 'path';

const REGISTRY_FILE = 'modules.json';

export async function getRegistry() {
    try {
        const data = await fs.readFile(path.join(process.cwd(), REGISTRY_FILE), 'utf8');
        return JSON.parse(data);
    } catch {
        return { modules: [] };
    }
}

export async function registerModule(moduleName, archetype, components = []) {
    const filePath = path.join(process.cwd(), REGISTRY_FILE);
    const registry = await getRegistry();

    const idx = registry.modules.findIndex(m => m.name === moduleName);
    const entry = { name: moduleName, archetype, components, updatedAt: new Date().toISOString() };

    if (idx >= 0) {
        registry.modules[idx] = entry;
    } else {
        registry.modules.push(entry);
    }

    await fs.writeFile(filePath, JSON.stringify(registry, null, 2), 'utf8');
}