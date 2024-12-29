import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function processInput(filename) {
    const input = fs.readFileSync(path.join(__dirname)+`/${filename}.txt`, 'utf-8');
    return Promise.resolve(input);
}