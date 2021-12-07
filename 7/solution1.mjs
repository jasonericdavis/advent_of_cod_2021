import {getInput} from '../util/getLines.mjs'

const data = getInput('7', 'input.txt')

const crabPositions = data.split(',')
let best = {move: 0, position: null}


crabPositions.forEach((position, index) => {
    const moves = crabPositions.reduce((acc, current) => {
        return acc + Math.abs(current - position)
    }, 0)
    if (index === 0  || moves < best.moves) {
        best = {moves, position}
    }
    //console.log(`Position: ${position} | Moves: ${moves} | Best: ${best}`)
})

console.log(best)
