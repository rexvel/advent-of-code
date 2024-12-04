import fs from 'fs';

function isReportSafe(levels) {
    if (levels.length < 2) return true;
    
    const firstDiff = levels[1] - levels[0];
    if (firstDiff === 0) return false;
    
    const shouldIncrease = firstDiff > 0;
    
    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i-1];
        
        if (shouldIncrease && diff <= 0) return false;
        if (!shouldIncrease && diff >= 0) return false;
        
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
    }
    
    return true;
}

function countSafeReports(input) {
    const reports = input.trim().split('\n').filter(line => line.length > 0);
    
    let safeCount = 0;
    for (const report of reports) {
        const levels = report.trim().split(/\s+/).map(Number);
        if (isReportSafe(levels)) {
            safeCount++;
        }
    }
    
    return safeCount;
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

processFile('input.txt');