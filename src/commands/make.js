import prompts from 'prompts';
import { generateCrudModule } from '../generators/crud.js';
import { generateApiModule } from '../generators/api.js';
import { generateFullModule } from '../generators/full.js';
import { generateAggregateModule } from '../generators/aggregate.js';

export async function runMakeCommand(archetypeArg, moduleName, options) {
    const validArchetypes = ['crud', 'api', 'full', 'aggregate'];

    // Handle invocation like `mm make crud Employee` or `mm make Employee crud`
    if (archetypeArg && validArchetypes.includes(archetypeArg.toLowerCase()) && !moduleName) {
        const nameRes = await prompts({
            type: 'text',
            name: 'name',
            message: 'Provide the module name (e.g. Employee, Product):',
            validate: v => v.trim() ? true : 'Module name is required.'
        });
        moduleName = nameRes.name;
        archetypeArg = archetypeArg.toLowerCase();
    } else if (archetypeArg && !validArchetypes.includes(archetypeArg.toLowerCase()) && !moduleName) {
        moduleName = archetypeArg;
        archetypeArg = null;
    }

    if (!moduleName) {
        const nameRes = await prompts({
            type: 'text',
            name: 'name',
            message: 'Provide the module name (e.g. Employee, Product):',
            validate: v => v.trim() ? true : 'Module name is required.'
        });
        moduleName = nameRes.name;
    }

    if (!moduleName) return;
    const formattedName = moduleName.charAt(0).toUpperCase() + moduleName.slice(1).trim();

    let archetype = archetypeArg ? archetypeArg.toLowerCase() : null;
    if (!archetype || !validArchetypes.includes(archetype)) {
        const archRes = await prompts({
            type: 'select',
            name: 'archetype',
            message: `Select an archetype for module [${formattedName}]:`,
            choices: [
                { title: 'crud      — Standard resource (Model, Controller, Migration)', value: 'crud' },
                { title: 'api       — Pure REST API / Webhooks', value: 'api' },
                { title: 'full      — Comprehensive module (Service, Request, Policy)', value: 'full' },
                { title: 'aggregate — Multi-layered container / Aggregate Root', value: 'aggregate' }
            ]
        });
        archetype = archRes.archetype;
    }

    if (!archetype) return;

    // Invoke the appropriate generator
    switch (archetype) {
        case 'crud':
            await generateCrudModule(formattedName, options);
            break;
        case 'api':
            await generateApiModule(formattedName, options);
            break;
        case 'full':
            await generateFullModule(formattedName, options);
            break;
        case 'aggregate':
            await generateAggregateModule(formattedName, options);
            break;
        default:
            console.error(`[X] Unknown archetype: ${archetype}`);
    }
}