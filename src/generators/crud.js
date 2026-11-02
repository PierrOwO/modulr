import fs from 'fs/promises';
import path from 'path';
import { registerModule } from '../utils/registry.js';
import { config } from '../utils/config.js';
import { baseDir, generateStub } from '../utils/services.js';

export async function generateCrudModule(moduleName, options = {}) {
    const backendDir  = baseDir(config.backendDir, moduleName);
    const moduleType = 'crud/';
    

    console.log(`\n⚙️ Generating CRUD module [${moduleName}]...`);

    const dirs = ['Http/Controllers','Http/Resources','Services','Http/Requests','Routes', 'Models', 'DTOs', 'Database/Migrations', 'Providers', 'Tests/Feature'];
    for (const d of dirs) {
        await fs.mkdir(path.join(backendDir, d), { recursive: true });
    }


    // Controller
    await generateStub(moduleName, moduleType + 'controller.stub', 'controller');
    // Model
    await generateStub(moduleName, moduleType + 'model.stub', 'model');
    // DTO
    await generateStub(moduleName, moduleType + 'dto.stub', 'dto');
    // Migration
    await generateStub(moduleName, moduleType + 'migration.stub', 'migration');
    // Provider
    await generateStub(moduleName, moduleType + 'provider.stub', 'provider' );
    // Resource
    await generateStub(moduleName, moduleType + 'resource.stub', 'resource' );
    // Request
    await generateStub(moduleName, moduleType + 'request.stub', 'request' );
    // Service
    await generateStub(moduleName, moduleType + 'service.stub', 'service' );
    // Route
    await generateStub(moduleName, moduleType + 'web.routes.stub', 'web.route' );

    // Inertia / Vue option
    // if (options.inertia) {
    //     await fs.mkdir(path.join(backendDir, 'Resources/js'), { recursive: true });
    //     await fs.writeFile(path.join(backendDir, 'Resources/js', `${moduleName}Index.vue`), `<template>\n  <div class="p-6">\n    <h1 class="text-xl font-bold">${moduleName} Management</h1>\n  </div>\n</template>\n`, 'utf8');
    //     console.log(` -> Created Vue component (Inertia)`);
    // }

    await registerModule(moduleName, 'crud', ['controller', 'model', 'dto', 'migration', 'provider']);
    console.log(`[OK] CRUD module [${moduleName}] is ready.`);
}