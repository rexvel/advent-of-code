function readColumns(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const firstColumn = [];
    const secondColumn = [];
    
    const lines = fileContent.split('\n');
    
    lines.forEach(line => {
        if (line.trim() === '') return;
        
        const numbers = line.trim().split(/\s+/);
        
        if (numbers.length === 2) {
            firstColumn.push(Number(numbers[0]));
            secondColumn.push(Number(numbers[1]));
        }
    });
    
    return { firstColumn, secondColumn };
}
const { firstColumn:left, secondColumn:right } = readColumns('input.txt');

console.log(`left`, left);
console.log(`right`, right);


function calculateDistance(leftList, rightList) {

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


function calculateSimilarityScore(leftList, rightList) {
    return leftList.reduce((score, leftNum) => {
        const occurrences = rightList.filter(rightNum => rightNum === leftNum).length;
        return score + (leftNum * occurrences);
    }, 0);
}

console.log(calculateSimilarityScore(left, right)); 