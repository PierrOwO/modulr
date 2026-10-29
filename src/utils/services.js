import fs from 'fs/promises';
import path from 'path';
import { loadStub, renderStub } from '../utils/stubs.js';
import { config } from './config.js';
import { STUB_TYPES } from './stubTypes.js';

export function toSnakeCase(str) {
    if (!str) return '';
    
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .toLowerCase();
}

export function baseDir(dirPath, moduleName){
    return path.join(process.cwd(), dirPath, moduleName);
}

export function baseNamespace(moduleName, stubDir){
    const dirPath =config.backendDir + '/' + moduleName + '/' + stubDir ;

    if (!dirPath) return 'App\\Modules';

    const normalized = dirPath.split(path.sep).join('/');

    const cleanPath = normalized.replace(/^\/+|\/+$/g, '');

    const segments = cleanPath.split('/').map(segment => {
        if (!segment) return '';
            if (segment.toLowerCase() === 'app') return 'App';
            return segment.charAt(0).toUpperCase() + segment.slice(1);
        });

        return segments.join('\\');
}

export async function generateStub(moduleName, stubPath , stubType, isFrontend=false) {
    const backendDir    = baseDir(config.backendDir, moduleName);
    const frontendDir   = baseDir(config.frontendDir, moduleName);
    if(!isFrontend){
        const namespace     = baseNamespace(moduleName, STUB_TYPES[stubType]?.subDir)
        const tableName     = toSnakeCase(moduleName) + 's';
        const ctx           = { moduleName, namespace, tableName };

        const ts = new Date().toISOString().replace(/[-T:\.Z]/g, '').slice(0, 14);

        const isMigrationFile = stubType === 'migration' ?? false
            
            
        
        const stub = 
        await loadStub(
            stubPath, 
            `<?php 
            
            namespace ${namespace}; 
            
            class ${moduleName}${STUB_TYPES[stubType]?.suffix}
            {
                //not found stub file for this module.
            }
            `
        );
        await fs.writeFile(
            path.join(
                backendDir, 
                STUB_TYPES[stubType]?.subDir, 
                isMigrationFile ? `${ts}_create_${tableName}_table.php` : `${moduleName}${STUB_TYPES[stubType]?.suffix}.php`
            ),
            renderStub(stub, ctx),
            'utf8'
        );
    }
    else{
        const stub = 
        await loadStub(
            stubPath, 
            `//not found stub file for this module.`
        );
        await fs.writeFile(
            path.join(
                frontendDir, 
                STUB_TYPES[stubType]?.subDir, 
                `${moduleName}${STUB_TYPES[stubType]?.suffix}.js`
            ),
            renderStub(stub, ctx),
            'utf8'
        );
    }
    
    
}


