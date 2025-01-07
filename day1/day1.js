import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getFileContent = (filePath) => {
    try {
        const absolutePath = path.isAbsolute(filePath)
            ? filePath
            : path.resolve(__dirname, filePath);

        const fileContent = fs.readFileSync(absolutePath, 'utf8');

        const columns = fileContent.split('\n');

        return columns;
    } catch (e) {
        console.error(`Error reading file: ${filePath}`);
        throw e;
    }

}

export function readColumns() {

    const firstColumn = [];
    const secondColumn = [];

    columns.forEach(line => {
        if (line.trim() === '') return;

        const numbers = line.trim().split(/\s+/);

        if (numbers.length === 2) {
            firstColumn.push(Number(numbers[0]));
            secondColumn.push(Number(numbers[1]));
        }
    });

    return { firstColumn, secondColumn };
}

const columns = getFileContent('input.txt');

const { firstColumn: left, secondColumn: right } = readColumns(columns);


export function calculateDistance(leftList, rightList) {

    if (leftList.length !== rightList.length) {
        throw new Error("Lists must be of equal length");
    }

    const sortedLeft = [...leftList].sort((a, b) => a - b);
    const sortedRight = [...rightList].sort((a, b) => a - b);

    const totalDistance = sortedLeft.reduce((sum, currentLeft, index) => {
        const currentRight = sortedRight[index];
        const distance = Math.abs(currentLeft - currentRight);
        return sum + distance;
    }, 0);

    return totalDistance;
}



export function calculateSimilarityScore(leftList, rightList) {
    return leftList.reduce((score, leftNum) => {
        const occurrences = rightList.filter(rightNum => rightNum === leftNum).length;
        return score + (leftNum * occurrences);
    }, 0);
}


console.log(calculateDistance([3, 4, 25, 22, 3, 3],  [4, 3, 15, 3, 94, 3])); 
console.log(calculateSimilarityScore([3, 4, 25, 22, 3, 3],  [4, 3, 15, 3, 94, 3])); 
