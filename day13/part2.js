import fs from 'fs';
function parseMachines(input) {
    const machines = [];
    let currentMachine = {};
    
    input.split('\n').forEach(line => {
        line = line.trim();
        if (!line) return;
        
        if (line.startsWith('Button A:')) {
            currentMachine = {};
            const [x, y] = line.match(/X\+(\d+), Y\+(\d+)/).slice(1);
            currentMachine.buttonA = { x: BigInt(x), y: BigInt(y) };
        } 
        else if (line.startsWith('Button B:')) {
            const [x, y] = line.match(/X\+(\d+), Y\+(\d+)/).slice(1);
            currentMachine.buttonB = { x: BigInt(x), y: BigInt(y) };
        }
        else if (line.startsWith('Prize:')) {
            const [x, y] = line.match(/X=(\d+), Y=(\d+)/).slice(1);
            currentMachine.prize = { x: BigInt(x), y: BigInt(y) };
            machines.push(currentMachine);
        }
    });
    
    return machines;
}

// Extended Euclidean Algorithm
function extendedGCD(a, b) {
    if (b === 0n) {
        return { gcd: a, x: 1n, y: 0n };
    }
    
    const { gcd, x, y } = extendedGCD(b, a % b);
    return {
        gcd,
        x: y,
        y: x - (a / b) * y
    };
}

// Solve linear Diophantine equation
function solveDiophantine(a, b, c) {
    a = BigInt(a);
    b = BigInt(b);
    c = BigInt(c);
    
    const { gcd, x: x0, y: y0 } = extendedGCD(a, b);
    
    if (c % gcd !== 0n) {
        return null;
    }
    
    const scale = c / gcd;
    let x = x0 * scale;
    let y = y0 * scale;
    
    // Make both x and y positive
    const dx = b / gcd;
    const dy = -a / gcd;
    
    while (x <= 0n || y <= 0n) {
        x += dx;
        y -= dy;
    }
    
    return { x, y };
}

// Solve single machine
function solveMachine(machine) {
    const { buttonA, buttonB, prize } = machine;
    
    // Solve for X and Y coordinates
    const solX = solveDiophantine(buttonA.x, buttonB.x, prize.x);
    const solY = solveDiophantine(buttonA.y, buttonB.y, prize.y);
    
    if (!solX || !solY) {
        return null;
    }
    
    // Solutions must match for X and Y
    if (solX.x === solY.x && solX.y === solY.y) {
        const tokens = Number(solX.x * 3n + solX.y);
        return {
            pressA: Number(solX.x),
            pressB: Number(solX.y),
            tokens
        };
    }
    
    return null;
}

// Main solution function
function solve(input) {
    const machines = parseMachines(input);
    let totalTokens = 0;
    let solvableCount = 0;
    
    machines.forEach((machine, index) => {
        const solution = solveMachine(machine);
        if (solution) {
            console.log(`Machine ${index + 1}: Solvable`);
            console.log(`- Button A presses: ${solution.pressA}`);
            console.log(`- Button B presses: ${solution.pressB}`);
            console.log(`- Tokens needed: ${solution.tokens}`);
            totalTokens += solution.tokens;
            solvableCount++;
        } else {
            console.log(`Machine ${index + 1}: Unsolvable`);
        }
    });
    
    console.log(`\nTotal solvable machines: ${solvableCount}`);
    console.log(`Total tokens needed: ${totalTokens}`);
    return totalTokens;
}
function solve(input) {
    const machines = parseMachines(input);
    let totalTokens = 0;
    let solvableMachines = 0;
    
    machines.forEach((machine, index) => {
        const solution = solveMachine(machine);
        if (solution) {
            console.log(`Machine ${index + 1}:`);
            console.log(`- Press A: ${solution.pressA} times`);
            console.log(`- Press B: ${solution.pressB} times`);
            console.log(`- Total tokens: ${solution.tokens}`);
            totalTokens += solution.tokens;
            solvableMachines++;
        } else {
            console.log(`Machine ${index + 1}: Impossible to win`);
        }
    });
    
    console.log(`\nTotal solvable machines: ${solvableMachines}`);
    console.log(`Total tokens needed: ${totalTokens}`);
    return totalTokens;
}



try {
    const input = fs.readFileSync('input.txt', 'utf8');
    const result = solve(input);
    console.log(`\nTotal solvable machines: ${result.solvableMachines}`);
    console.log(`Total tokens needed: ${result.totalTokens}`);
} catch (err) {
    console.error('Error reading input file:', err);
}