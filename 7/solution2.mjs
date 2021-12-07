import {getInput} from '../util/getLines.mjs'

const data = getInput('7', 'sample.txt')



// I admittantly stole this from the internet and tweaked it for addition 
// https://www.freecodecamp.org/news/how-to-factorialize-a-number-in-javascript-9263c89a4b38/
function factorialize(num) {
    if (num === 0 || num === 1)
      return 1;
    for (var i = num - 1; i >= 1; i--) {
      num += i;
    }
    return num;
  }

  const crabPositions = data.split(',').map(Number).sort((a,b) => a - b)
let best = {move: 0, position: null}
console.log(`Checking ${crabPositions.length} positions`)

const x  = crabPositions.filter(function (value, index, array) { 
    return array.indexOf(value) === index;
});

console.log(`Unique positions: ${x.length}`)

const spread = 1
const lowIndex = Math.floor(x.length/2) - spread
const low = x[lowIndex]

const highIndex = Math.floor(x.length/2) + spread
const high = x[highIndex]
console.log(`Low: x[${lowIndex}] = ${low} High: x[${highIndex}] =${high}`)


x.forEach((position, index) => {
    //console.log(`Checking position ${index}`)
    for(let i = low; i < high; i++) {
        const moves = crabPositions.reduce((acc, current) => {
            return acc + factorialize(Math.abs(current - i) )
        }, 0)
        
        if (index === 0  || moves < best.moves) {
            best = {moves, position: i}
        }
    }
    //console.log(`Position(${index}): ${position} |  Best: ${JSON.stringify(best)}`)
})

console.log(best)

