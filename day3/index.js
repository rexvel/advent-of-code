import fs from 'fs';

const mul = (a, b) => {
    return a * b;
}

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);


function mullItOver() {
        const readFile = filename => fs.readFileSync(filename, 'utf8');
        const findMatches = data => data.match(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
        const sumMultiplications = arr => arr.reduce((acc, curr) => acc + eval(curr), 0);
        const logResult = result => console.log(`Result: ${result}`);
       
        return pipe(
          readFile,
          findMatches, 
          sumMultiplications,
          logResult
        )('input.txt');
}

mullItOver();



