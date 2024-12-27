import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function checkXMAS(grid, row, col, dRow, dCol) {
    const pattern = "XMAS";
    const rows = grid.length;
    const cols = grid[0].length;
    
    for (let i = 0; i < pattern.length; i++) {
        const newRow = row + i * dRow;
        const newCol = col + i * dCol;
        
        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
            return false;
        }
        
        if (grid[newRow][newCol] !== pattern[i]) {
            return false;
        }
    }
    return true;
}

function countXMAS(input) {
    const grid = input.trim().split('\n').map(row => row.trim().split(''));
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    const directions = [
        [0, 1], [1, 1], [1, 0], [1, -1],
        [0, -1], [-1, -1], [-1, 0], [-1, 1]
    ];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            for (const [dRow, dCol] of directions) {
                if (checkXMAS(grid, row, col, dRow, dCol)) {
                    count++;
                }
            }
        }
    }
    
    return count;
}

const input = fs.readFileSync(path.join(__dirname)+'/input.txt', 'utf-8');

console.log(`Number of XMAS occurrences: ${countXMAS(input)}`);