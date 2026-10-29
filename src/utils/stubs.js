import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { config } from './config.js';


export async function loadStub(stubPath, fallbackContent, isFrontend = false) {

    const localPath = path.join(process.cwd(), '.mm-stubs', isFrontend ? 'frontend/' + stubPath: 'backend/' + stubPath);
    try {
        return await fs.readFile(localPath, 'utf8');
    } catch {}

    try {
        const res = await axios.get(`${config.stubsUrl}/${stubPath}`, { timeout: 1500 });
        if (res.data) return res.data;
    } catch {}

    return fallbackContent;
}

export function renderStub(template, data) {
    let output = template;
    for (const [key, val] of Object.entries(data)) {
        output = output.replaceAll(`{{${key}}}`, val);
    }
    return output;
}