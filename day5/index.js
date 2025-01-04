import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseInput(input) {
    const [rulesSection, sequencesSection] = input.trim().split('\n\n');
    
    const rules = rulesSection.split('\n').map(rule => {
      const [before, after] = rule.split('|').map(Number);
      return { before, after };
    });
    
    const sequences = sequencesSection.split('\n').map(seq => 
      seq.split(',').map(Number)
    );
    
    return { rules, sequences };
  }
  
  function processSequence(rules, sequence) {
    const applicableRules = rules.filter(rule => 
      sequence.includes(rule.before) && 
      sequence.includes(rule.after)
    );
    
    for (const rule of applicableRules) {
      const beforeIndex = sequence.indexOf(rule.before);
      const afterIndex = sequence.indexOf(rule.after);
      if (beforeIndex > afterIndex) {
        return false;
      }
    }
    
    return true;
  }
  
  function findMiddleAndSum(validSequences) {
    return validSequences
      .map(seq => {
        const middleIndex = Math.floor(seq.length / 2);
        return seq[middleIndex];
      })
      .reduce((sum, middle) => sum + middle, 0);
  }
  
  
  function solve(input) {
    const { rules, sequences } = parseInput(input);
    
    const validSequences = sequences.filter(seq => 
      processSequence(rules, seq)
    );
    
    return findMiddleAndSum(validSequences);
  }
  

  try {
    const input = fs.readFileSync(path.join(__dirname)+'/input.txt', 'utf-8');
    const res = solve(input);

    console.log(`The answer is: ${res}`);
} catch (err) {
    console.error('Error reading input file:', err);
}