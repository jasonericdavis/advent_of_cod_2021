import {getLines} from '../util/getLines.mjs'

const lines = getLines("5",'sample.txt');

const checkStraighLines = (point1, point2, points) => {
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
}

const checkDiagonalLines = (point1, point2, points) => {
    if(point1.x === point1.y && point2.x === point2.y) {
        console.log(`Creating diagonal 1 point from points ${point1.x}, ${point1.y} -> ${point2.x}, ${point2.y}`)
        let lowerNumber = Math.min(point1.x, point1.x)
        let higherNumber = Math.max(point1.x, point2.x)
        while(lowerNumber < higherNumber) {
            const newPoint = {x: lowerNumber, y: lowerNumber, occurences: 1}
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

    if(point1.x === point2.y && point2.x === point1.y) {
        console.log(`Creating diagonal 2 point from points ${point1.x}, ${point1.y} -> ${point2.x}, ${point2.y}`)
        let lowerNumber = Math.min(point1.x, point1.y, point2.x, point2.y)
        let higherNumber = Math.max(point1.x, point1.y, point2.x, point2.y)
        while(lowerNumber < higherNumber) {
            const newPoint = {x: lowerNumber, y: lowerNumber, occurences: 1}
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
}


const points = []

lines.map((line, index) => {
    console.log(`Checking line: ${line}`)
    const [point1, point2] = line.split(' -> ').reduce((acc, curr) => { 
        const [x, y] = curr.split(',').map(Number)
        acc.push({x, y})
        return acc
    }, [])

    checkStraighLines(point1, point2, points)
    checkDiagonalLines(point1, point2, points)
})

console.log(points.sort((point1, point2) => point1.x > point2.x).sort((point1, point2) => point1.y > point2.y))
console.log(`${points.filter(point => point.occurences > 1).length} points overlap`)