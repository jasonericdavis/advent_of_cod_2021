import {getLines} from '../util/getLines.mjs'

const lines = getLines("2",'input1.txt');
let horizontalPosition = 0
let depthPosition = 0

lines.map(line => {
    console.log(line)
    const [direction, distance] = line.split(' ');

    if(direction.toLowerCase() === 'forward') {
        horizontalPosition += Number(distance)
    }

    if(direction.toLowerCase() === 'up') {
        depthPosition -= Number(distance)
    }

    if(direction.toLowerCase() === 'down') {
        depthPosition += Number(distance)
    }
})

console.log(` (${horizontalPosition} Horizontal Postion) * (${depthPosition} depthPosition) = ${horizontalPosition * depthPosition}`)