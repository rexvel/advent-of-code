import fs from 'fs';

export function processFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const result = countSafeReports(data);
        console.log(`Number of safe reports: ${result}`);
        return result;
    } catch (err) {
        console.error('Error reading or processing file:', err);
    }
}