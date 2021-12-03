import {getLines} from '../util/getLines.mjs'

const lines = getLines("3",'input.txt');

const gammaRate = []
const epsilonRate = []

for(let bitIndex=0;bitIndex<lines[0].length;bitIndex++){
    const zeroBits = lines.filter(line=> line[bitIndex]==='0').length;
    gammaRate.push(zeroBits > lines.length/2 ? '0' : '1')
    epsilonRate.push(zeroBits > lines.length/2 ? '1' : '0')
}

console.log(`Gamma Rate: ${gammaRate.join('')} => ${parseInt(gammaRate.join(''),2)}`)
console.log(`Episolon Rate: ${epsilonRate.join('')} => ${parseInt(epsilonRate.join(''),2)}`)
console.log(`Power Consumption: ${parseInt(gammaRate.join(''),2) * parseInt(epsilonRate.join(''),2)}`)