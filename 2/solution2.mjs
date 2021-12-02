import {getLines} from '../util/getLines.mjs'

const lines = getLines("2",'input1.txt');
let horizontalPosition = 0
let depthPosition = 0
let aim = 0

lines.map(line => {
    console.log(line)
    const [direction, distance] = line.split(' ');

    /**
     * forward X does two things:
            It increases your horizontal position by X units.
            It increases your depth by your aim multiplied by X.
     */
    if(direction.toLowerCase() === 'forward') {
        horizontalPosition += Number(distance)
        depthPosition += aim * Number(distance)
    }

    // up X decreases your aim by X units
    if(direction.toLowerCase() === 'up') {
        aim -= Number(distance)
    }

    // down X increases your aim by X units
    if(direction.toLowerCase() === 'down') {
        aim += Number(distance)
    }
})

console.log(` (${horizontalPosition} Horizontal Postion) * (${depthPosition} depthPosition) = ${horizontalPosition * depthPosition}`)