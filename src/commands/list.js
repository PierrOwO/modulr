import { getRegistry } from '../utils/registry.js';

export async function runListCommand() {
    const reg = await getRegistry();
    console.log(`\n Registered modules in architecture (${reg.modules.length}):\n`);
    if (!reg.modules.length) {
        console.log('  No modules found. Use `mm make` to create your first one.');
        return;
    }
    reg.modules.forEach(m => {
        console.log(` • [${m.archetype.toUpperCase()}] ${m.name} (Components: ${m.components.join(', ')})`);
    });
    console.log('');
}