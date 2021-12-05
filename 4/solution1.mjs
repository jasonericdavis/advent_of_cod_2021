import {getInput} from '../util/getLines.mjs'

const data = getInput('4', 'input.txt')

const [numbers, ... boardNumbers] = data.split('\n\n')

const createBoard = (values => {
    let board = []
    values.split('\n').forEach((row, index) => {
        const columns = row.split(' ').filter(c => c !== '')
        columns.map((column, colIndex) => {
            board.push({
                row: index,
                col: colIndex,
                value: Number(column)
            })
        })
    })

    return board
})

const bingo = (board, number) => {
    board.filter(cell => cell.value === Number(number)).forEach(cell => { cell.marked = true })
    const boardSize = board.reduce((prev, current, index, acc) => {
        return {
            row: Math.max(prev.row, current.row),
            col: Math.max(prev.col, current.col)
        }
    })

    for(let row = 0; row <= boardSize.row; row++) {
        let rowValues = board.filter(c => c.row === row && c.marked)
        if(rowValues.length === boardSize.row + 1) {
            return true
        }
    }

    for(let col = 0; col <= boardSize.col; col++) {
        let colValues = board.filter(c => c.column === col && c.marked)
        if(colValues.length === boardSize.col + 1) {
            return true
        }
    }

    return false
}

const boards = boardNumbers.map(board => createBoard(board))

let winningBoard = -1

numbers.split(',').some(number => {
    winningBoard =  boards.findIndex(board => bingo(board, Number(number)))
    if(winningBoard > -1) {
        const sumOfMarkedNumbers = boards[winningBoard].filter(cell => !cell.marked).reduce((prev, current, acc) => {
            return prev + current.value
        }, 0)
        console.log(`Winning Board: Board ${winningBoard + 1} \nFinal Score: ${sumOfMarkedNumbers * Number(number)}`)
        return true
    }
    return false
})
