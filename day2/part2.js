import fs from 'fs';

function checkDifferences(numbers) {
    for (let i = 0; i < numbers.length - 1; i++) {
        const diff = Math.abs(numbers[i + 1] - numbers[i]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }
    return true;
}

function isMonotonicAndDifferent(numbers) {
    if (numbers.length <= 1) {
        return true;
    }
    
    const increasing = numbers[1] > numbers[0];
    
    for (let i = 0; i < numbers.length - 1; i++) {
        if (increasing) {
            if (numbers[i + 1] <= numbers[i]) {
                return false;
            }
        } else {
            if (numbers[i + 1] >= numbers[i]) {
                return false;
            }
        }
    }
    return true;
}

function isSafeReport(report) {
    const numbers = report.split(' ').map(Number);
    return isMonotonicAndDifferent(numbers) && checkDifferences(numbers);
}

function countSafeReports(inputData) {
    const reports = inputData.trim().split('\n');
    return reports.reduce((count, report) => count + (isSafeReport(report) ? 1 : 0), 0);
}

function processFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const result = countSafeReports(data);
        console.log(`Number of safe reports: ${result}`);
        return result;
    } catch (err) {
        console.error('Error reading or processing file:', err);
        return null;
    }
}

processFile('input2.txt');