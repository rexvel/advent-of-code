import { readInput } from '../utils/index.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));

class Equation {
    constructor(testValue, numbers) {
        this.testValue = testValue;
        this.numbers = numbers;
    }
}
        
  function parseInput(input) {
    return input.split('\n')
      .map(line => {
        line = line.trim();
        if (!line) return null;
        
        const [testValue, numbersStr] = line.split(':');
        const numbers = numbersStr.trim().split(' ').map(Number);
        
        return new Equation(Number(testValue), numbers);
      })
      .filter(eq => eq !== null);
  }
  
  function generateOperatorCombinations(length) {
    const operators = ['+', '*'];
    const combinations = [];
    
    function generate(current = []) {
      if (current.length === length) {
        combinations.push([...current]);
        return;
      }
      
      for (const operator of operators) {
        current.push(operator);
        generate(current);
        current.pop();
      }
    }
    
    generate();
    return combinations;
  }
  
  function calculateResult(numbers, operators) {
    let result = numbers[0];
    
    for (let i = 0; i < operators.length; i++) {
      const currentOperator = operators[i];
      const nextNumber = numbers[i + 1];
      
      if (currentOperator === '+') {
        result += nextNumber;
      } else if (currentOperator === '*') {
        result *= nextNumber;
      }
    }
    
    return result;
  }
  
  function solve(input) {
    const equations = parseInput(input);
    let totalSum = 0;
    
    equations.forEach(equation => {
      const operatorCombinations = generateOperatorCombinations(equation.numbers.length - 1);
      
      const isPossible = operatorCombinations.some(operators => {
        const result = calculateResult(equation.numbers, operators);
        return result === equation.testValue;
      });
      
      if (isPossible) {
        totalSum += equation.testValue;
      }
    });
    
    return totalSum;
  }

const parsedInput = await readInput('input.txt', __dirname);

const result = solve(parsedInput);

console.log(result)