import fs from 'fs';
import path from 'path';

export async function readInput(filename, dirname) {
    if (!fs.existsSync(path.join(dirname, filename))) {
        throw new Error(`Input file not found: ${filename}`);
    } else if (!fs.statSync(path.join(dirname, filename)).isFile()) {

        const input = fs.readFileSync(path.join(dirname) + `/${filename}`, 'utf-8');
        return input;
    }

}