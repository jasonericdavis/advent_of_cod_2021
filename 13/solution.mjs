import { createCipheriv } from 'crypto'
import {getInput} from '../util/getLines.mjs'
import fs from 'fs'

const args = process.argv.slice(2)
const data = getInput('13', args[0])
const [section1, section2] = data.split('\n\n')

const dots = section1.split('\n').map(line => {
    const coords = line.split(',')
    return {x: parseInt(coords[0]), y: parseInt(coords[1])}
})

const maxX = dots.reduce((max, dot) => Math.max(max, dot.x), 0)
const maxY = dots.reduce((max, dot) => Math.max(max, dot.y), 0)
const transparentPaper = Array(maxY + 1).fill(0).map(() => Array(maxX + 1).fill('.'))

dots.map(dot => {
    try{
        transparentPaper[dot.y][dot.x] = '#'
    } catch(e) {
        console.log(dot)
    }
    
})

const printPaper = paper => {
    console.log(
        paper.reduce((str, row) => str + row.join('') + '\n', '')
    )
}

const folds = section2.split('\n').map(line => {
    return line.split('fold along ')[1]
})

// use the line below instead of the for each for solution 1
//let fold = folds[0]
folds.forEach(fold => {
    if(fold.startsWith('y')){
        try{
            const foldPoint = parseInt(fold.split('y=')[1])
            transparentPaper[foldPoint].forEach((dot,i, array) => {
                array[i] = '-'
            })
        
            let adjacentRow = foldPoint - 1
            for(let currentRow = foldPoint + 1; currentRow < transparentPaper.length; currentRow++){
                transparentPaper[currentRow].forEach((dot,i, row) => {
                    if(adjacentRow < 0) return
                    transparentPaper[adjacentRow][i] = (dot === '#' && transparentPaper[adjacentRow][i] === '.') ? '#' : transparentPaper[adjacentRow][i]
                    transparentPaper[currentRow][i] = 'x'
                })
                adjacentRow--
            }
        }
        catch(e){
            console.log(e)
        }
    }
    
    if(fold.startsWith('x')){
        try {
            const foldPoint = parseInt(fold.split('x=')[1])
            transparentPaper.forEach((row, i, array) => {
                array[i][foldPoint] = '|'
            })
        
            let adjacentCol = foldPoint - 1
            for(let currentCol = foldPoint + 1; currentCol < maxX + 1; currentCol++){
                transparentPaper.forEach((row, i, array) => {
                    if(adjacentCol < 0) return
                    array[i][adjacentCol] = (row[currentCol] === '#' && array[i][adjacentCol] === '.') ? '#' : array[i][adjacentCol]
                    array[i][currentCol] = 'x'
                })
                adjacentCol--
            }
        }
        catch(e){
            console.log(e)
        }
    }
})

printPaper(transparentPaper)
console.log(`${transparentPaper.reduce((sum, row) => sum + row.filter(dot => dot === '#').length, 0)} are visible`)
fs.writeFileSync('13/transparentPaper.txt', transparentPaper.reduce((str, row) => str + row.join('') + '\n', ''))