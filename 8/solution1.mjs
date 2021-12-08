import {getInput} from '../util/getLines.mjs'

const args = process.argv.slice(2)
const data = getInput('8', args[0])
console.log(data)

const rows = data.split('\n')

const uniqueDigitSizer = [2, 3, 4, 7]
const digits = rows.reduce((acc, row) => {
    const [part1, part2] = row.split(' | ')
    const parts = part2.split(' ')
    return acc + parts.filter(part => uniqueDigitSizer.includes(part.length)).length
},0)

console.log(digits)