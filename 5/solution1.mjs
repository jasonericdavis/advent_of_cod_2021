import {getLines} from '../util/getLines.mjs'

const lines = getLines("5",'input.txt');

const points = []

lines.map((line, index) => {
    console.log(`Checking line: ${index}`)
    const [point1, point2] = line.split(' -> ').reduce((acc, curr) => { 
        const [x, y] = curr.split(',').map(Number)
        acc.push({x, y})
        return acc
    }, [])

    if(point1.x === point2.x) {
        let lowerNumber = Math.min(point1.y, point2.y)
        let higherNumber = Math.max(point1.y, point2.y)
        while(lowerNumber <= higherNumber) {
            const newPoint = {x: point1.x, y: lowerNumber, occurences: 1}
            const existingOccurences = points.filter(point => point.x === newPoint.x && point.y === newPoint.y)
            if(existingOccurences.length === 0) {
                points.push(newPoint)
            } else {
                existingOccurences.map(point => point.occurences++)
            }
            lowerNumber++
        }
        return
    }

    if(point1.y === point2.y) {
        let lowerNumber = Math.min(point1.x, point2.x)
        let higherNumber = Math.max(point1.x, point2.x)
        while(lowerNumber <= higherNumber) {
            const newPoint = {x: lowerNumber, y: point1.y, occurences: 1}
            const existingOccurences = points.filter(point => point.x === newPoint.x && point.y === newPoint.y)
            if(existingOccurences.length === 0) {
                points.push(newPoint)
            } else {   
                existingOccurences.map(point => point.occurences++)
            }
            lowerNumber++
        }
        return
    }
})

console.log(points)
console.log(`${points.filter(point => point.occurences > 1).length} points overlap`)