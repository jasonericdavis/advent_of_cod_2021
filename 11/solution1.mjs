import {getLines} from '../util/getLines.mjs'
const args = process.argv.slice(2)
const lines = getLines('11', args[0])

const data = lines.reduce((acc, line, row) => {
    line.split('').forEach((cell, col) => { acc.push({value: Number(cell), row, col, flashes: 0, lastFlashIteration: -1}) })
    return acc
}, [])

const displayGrid = data => {
    console.log(data.reduce((acc, cell, index) => {
        if(cell.col == 0) {
            acc.push([])
        }
        acc[cell.row].push(cell.value)
        return acc
    }, []).reduce((acc, row) => {
        return acc + row.join('') + '\n'
    }, '').trim())
}

const flashNeighbours = (data, octopus, iteration) => {
    const neighborOctopuses = data.filter(neighbors => {
        return [octopus.row - 1, octopus.row, octopus.row + 1].includes(neighbors.row) 
        && [octopus.col - 1, octopus.col, octopus.col + 1].includes(neighbors.col) 
        && neighbors.lastFlashIteration != iteration
    })
    
    neighborOctopuses.forEach(neighbor => {
        neighbor.value++
        if(neighbor.value > 9) {
            neighbor.value = 0
            neighbor.flashes++
            neighbor.lastFlashIteration = iteration
            octopusesThatFlashed.push(neighbor)
        }
    })
}

const octopusesThatFlashed = []

const iterate =  (data, iteration) => {
    console.log(`\nIteration ${iteration}`)

    data.forEach(cell => {
        cell.value++
        if(cell.value > 9) {
            cell.value = 0
            cell.flashes++
            cell.lastFlashIteration = iteration
            octopusesThatFlashed.push(cell)
        }
    })
    console.log(octopusesThatFlashed.length)

    while(octopusesThatFlashed.length > 0) {
        const flashedOctopus = octopusesThatFlashed.pop()
        flashNeighbours(data, flashedOctopus, iteration)
    }

    displayGrid(data)
    console.log(`Flashes: ${data.reduce((acc, cell) => acc + cell.flashes, 0)}`)
}

displayGrid(data)
for(let iteration  = 0; iteration < 100; iteration++) {
    iterate(data, iteration)
}

