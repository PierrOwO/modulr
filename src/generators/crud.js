import fs from 'fs/promises';
import path from 'path';
import { registerModule } from '../utils/registry.js';
import { config } from '../utils/config.js';
import { baseDir, generateStub } from '../utils/services.js';

export async function generateCrudModule(moduleName, options = {}) {
    const backendDir  = baseDir(config.backendDir, moduleName);
    

    console.log(`\n⚙️ Generating CRUD module [${moduleName}]...`);

    const dirs = ['Http/Controllers','Http/Resources', 'Models', 'DTOs', 'Database/Migrations', 'Providers', 'Tests/Feature'];
    for (const d of dirs) {
        await fs.mkdir(path.join(backendDir, d), { recursive: true });
    }


    // Controller
    await generateStub(moduleName, 'controllers/crud.stub', 'controller');
    // Model
    await generateStub(moduleName, 'model.stub', 'model');
    // DTO
    await generateStub(moduleName, 'dto.stub', 'dto');
    // Migration
    await generateStub(moduleName, 'migration.stub', 'migration');
    // Provider
    await generateStub(moduleName, 'provider.stub', 'provider' );
    // Resource
    await generateStub(moduleName, 'resource.stub', 'resource' );

    // Inertia / Vue option
    // if (options.inertia) {
    //     await fs.mkdir(path.join(backendDir, 'Resources/js'), { recursive: true });
    //     await fs.writeFile(path.join(backendDir, 'Resources/js', `${moduleName}Index.vue`), `<template>\n  <div class="p-6">\n    <h1 class="text-xl font-bold">${moduleName} Management</h1>\n  </div>\n</template>\n`, 'utf8');
    //     console.log(` -> Created Vue component (Inertia)`);
    // }

    await registerModule(moduleName, 'crud', ['controller', 'model', 'dto', 'migration', 'provider']);
    console.log(`[OK] CRUD module [${moduleName}] is ready.`);
}