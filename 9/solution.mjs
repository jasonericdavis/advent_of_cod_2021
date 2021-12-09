import {getLines} from '../util/getLines.mjs'
const args = process.argv.slice(2)
const lines = getLines('9', args[0])

const direction = {
    up:'up', down:'down', left:'left', right:'right'
}

const isNeighborCellHigher = (currentCell, neighbordirection, cells) => {
    let neighbors = null
    if(neighbordirection == direction.left) {
        if(currentCell.col === 0) return true
        neighbors = cells.filter(cell => {
            return cell.row === currentCell.row && cell.col === currentCell.col - 1 && currentCell.value < cell.value
        })
    }

    if(neighbordirection == direction.up) {
        if(currentCell.row === 0) return true
        neighbors =  cells.filter(cell => {
            return cell.row === currentCell.row - 1 && cell.col === currentCell.col && currentCell.value < cell.value
        })
    }

    if(neighbordirection == direction.right) {
        const maxCol =cells.reduce((acc, cell) => (cell.col > acc) ? cell.col : acc, 0)
        if(currentCell.col === maxCol) return true
        neighbors =  cells.filter(cell => {
            return cell.row === currentCell.row && cell.col === currentCell.col + 1 && currentCell.value < cell.value
        })
    }

    if(neighbordirection == direction.down) {
        const maxRow =cells.reduce((acc, cell) => (cell.row > acc) ? cell.row : acc, 0)
        if(currentCell.row === maxRow) return true
        neighbors =  cells.filter(cell => {
            return cell.row === currentCell.row + 1 && cell.col === currentCell.col && currentCell.value < cell.value
        })
    }
    return neighbors.length > 0
}

const data = lines.reduce((acc, line, row) => {
    line.split('').forEach((cell, col) => { acc.push({value: Number(cell), row, col}) })
    return acc
}, [])

let breakdown = data.filter((cell, index) => {
    return isNeighborCellHigher(cell, direction.left, data) 
        && isNeighborCellHigher(cell, direction.up, data)
        && isNeighborCellHigher(cell, direction.right, data)
        && isNeighborCellHigher(cell, direction.down, data)
})

console.log(breakdown.length)
console.log(breakdown)

console.log(`Sum of the risk levels: ${breakdown.reduce((acc, cell) => acc + cell.value + 1, 0)}`)

