import fs from 'fs';

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function findButtonPresses(a1, b1, target, a2, b2, targetY) {
    const gcdX = gcd(a1, b1);
    const gcdY = gcd(a2, b2);
    
    if (target % gcdX !== 0 || targetY % gcdY !== 0) {
        return null;
    }

    for (let pressA = 0; pressA <= 100; pressA++) {
        for (let pressB = 0; pressB <= 100; pressB++) {
            const x = pressA * a1 + pressB * b1;
            const y = pressA * a2 + pressB * b2;
            
            if (x === target && y === targetY) {
                return { pressA, pressB };
            }
        }
    }
    
    return null;
}

function calculateTokens(pressA, pressB) {
    return pressA * 3 + pressB * 1;
}

function solveMachine(buttonA, buttonB, prize) {
    const result = findButtonPresses(
        buttonA.x, buttonB.x, prize.x,
        buttonA.y, buttonB.y, prize.y
    );
    
    if (!result) return null;
    
    const tokens = calculateTokens(result.pressA, result.pressB);
    return {
        pressA: result.pressA,
        pressB: result.pressB,
        tokens: tokens
    };
}

function solve(input) {
    const machines = [];
    let currentMachine = null;
    
    const lines = input.trim().split('\n');
    for (const line of lines) {
        if (line.trim() === '') continue;
        
        if (line.startsWith('Button A:')) {
            currentMachine = { buttonA: {}, buttonB: {}, prize: {} };
            const [x, y] = line.match(/X\+(\d+), Y\+(\d+)/).slice(1);
            currentMachine.buttonA = { x: parseInt(x), y: parseInt(y) };
        } else if (line.startsWith('Button B:')) {
            const [x, y] = line.match(/X\+(\d+), Y\+(\d+)/).slice(1);
            currentMachine.buttonB = { x: parseInt(x), y: parseInt(y) };
        } else if (line.startsWith('Prize:')) {
            const [x, y] = line.match(/X=(\d+), Y=(\d+)/).slice(1);
            currentMachine.prize = { x: parseInt(x), y: parseInt(y) };
            machines.push(currentMachine);
        }
    }
    
    let totalTokens = 0;
    let solvableCount = 0;
    
    machines.forEach((machine, index) => {
        const solution = solveMachine(machine.buttonA, machine.buttonB, machine.prize);
        if (solution) {
            console.log(`Machine ${index + 1}: Solvable with ${solution.pressA} A presses and ${solution.pressB} B presses (${solution.tokens} tokens)`);
            totalTokens += solution.tokens;
            solvableCount++;
        } else {
            console.log(`Machine ${index + 1}: No solution found`);
        }
    });
    
    console.log(`\nTotal solvable machines: ${solvableCount}`);
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