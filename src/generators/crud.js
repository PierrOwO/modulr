import fs from 'fs/promises';
import path from 'path';
import { registerModule } from '../utils/registry.js';
import { config } from '../utils/config.js';
import { baseDir, createDirs, generateStub } from '../utils/services.js';

export async function generateCrudModule(moduleName, options = {}) {
    const backendDir  = baseDir(config.backendDir, moduleName);
    const moduleType = 'CRUD';
    const moduleData = [
        'controller', 
        'request', 
        'resource', 
        'service', 
        'web.route', 
        'model', 
        'dto', 
        'migration', 
        'provider',
    ]
    const dirs = [
        'Http/Controllers',
        'Http/Resources',
        'Services',
        'Http/Requests',
        'Routes', 
        'Models', 
        'DTOs', 
        'Database/Migrations', 
        'Providers', 
        'Tests/Feature'
    ];

    console.log(`\n⚙️ Generating ${moduleType} module [${moduleName}]...`);
    
    await createDirs(backendDir, dirs);


    // Controller
    await generateStub(moduleName, 'crud/controller.stub', 'controller');
    // Model
    await generateStub(moduleName, 'crud/model.stub', 'model');
    // DTO
    await generateStub(moduleName, 'crud/dto.stub', 'dto');
    // Migration
    await generateStub(moduleName, 'crud/migration.stub', 'migration');
    // Provider
    await generateStub(moduleName, 'crud/provider.stub', 'provider' );
    // Resource
    await generateStub(moduleName, 'crud/resource.stub', 'resource' );
    // Request
    await generateStub(moduleName, 'crud/request.stub', 'request' );
    // Service
    await generateStub(moduleName, 'crud/service.stub', 'service' );
    // Route
    await generateStub(moduleName, 'crud/web.routes.stub', 'web.route' );

    // Inertia / Vue option
    // if (options.inertia) {
    //     await fs.mkdir(path.join(backendDir, 'Resources/js'), { recursive: true });
    //     await fs.writeFile(path.join(backendDir, 'Resources/js', `${moduleName}Index.vue`), `<template>\n  <div class="p-6">\n    <h1 class="text-xl font-bold">${moduleName} Management</h1>\n  </div>\n</template>\n`, 'utf8');
    //     console.log(` -> Created Vue component (Inertia)`);
    // }

    await registerModule(moduleName, moduleType, moduleData);

    console.log(`[OK] ${moduleType} module [${moduleName}] is ready.`);
}