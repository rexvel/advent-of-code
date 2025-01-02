import fs from 'fs';
import path from 'path';

export async function readInput(filename, dirname) {
    const input = fs.readFileSync(path.join(dirname)+`/${filename}`, 'utf-8');
    return Promise.resolve(input);
}