import {getInput} from '../util/getLines.mjs'

const data = getInput('6', 'input.txt')
const laternFish = data.split(',').map(x => Number(x))
const iterations = 80

for(let iteration = 0; iteration < iterations; iteration++) {
    laternFish.forEach((x, index) => {
        if(x === 0) {
            laternFish[index] = 6
            laternFish.push(8)
        } else {
            laternFish[index]--
        }
    })
    console.log(`Day ${iteration}: ${laternFish.length}`)
}

console.log(`${laternFish.length} fish were created`)