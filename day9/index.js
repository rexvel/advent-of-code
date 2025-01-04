import { readInput } from '../utils/index.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const convertInput = async (input) => {
    let disk = [];
    let fileId = 0;

    for (let i = 0; i < input.length; i++) {
        const len = parseInt(input[i]);

        for (let j = 0; j < len; j++) {
            disk.push(i % 2 === 0 ? fileId : '.');
        }

        if (i % 2 === 0) fileId++;
    }

    return await disk;
}

const optimizeDiskSpace = async (disk) => {

    while (true) {
        let rightPos = disk.length - 1;
        while (rightPos >= 0 && disk[rightPos] === '.') rightPos--;

        if (rightPos < 0) break;

        let leftPos = 0;
        while (leftPos < rightPos && disk[leftPos] !== '.') leftPos++;

        if (leftPos >= rightPos) break;

        disk[leftPos] = disk[rightPos];
        disk[rightPos] = '.';
    }

    return await disk;
}

const calculateCheckSum = (disk) => {
    const checksum = disk.reduce((sum, value, index) =>
        value !== '.' ? sum + (index * value) : sum, 0);

    return checksum;
}


async function solve(input) {
    readInput('input.txt', __dirname)
        .then(convertInput)
        .then(optimizeDiskSpace)
        .then(calculateCheckSum)
        .catch((err) => {
            console.log('Failed to optimize disk space', err.message);
        });

    console.log(output);
}


solve(parsedInput);