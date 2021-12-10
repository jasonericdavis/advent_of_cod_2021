import {getLines} from '../util/getLines.mjs'
const args = process.argv.slice(2)
const lines = getLines('10', args[0])

const lineScans = []

lines.forEach(line => {

    let openTag = null
    const openingTags = ['{', '[', '<', '(']
    const closingTags = ['}', ']', '>', ')']

    const lineScan = line.split('').reduce((acc, char, index) => {
        if(acc.corrupted) return acc

        if(openingTags.includes(char)) {
            acc.openTags.push(char)
        }

        if(closingTags.includes(char)) {
            openTag = openingTags[closingTags.indexOf(char)]
            if(openTag === acc.openTags[acc.openTags.length - 1]) {
                acc.openTags.pop()
            } else {
                acc.corrupted = true
                acc.corruptedChar = char
            }
        }

        return acc
    }, {corrupted: false, corruptedChar: null, openTags: []})

    lineScans.push(lineScan)
})

console.log(`Corrupted Value: ${lineScans.filter(scan => scan.corrupted).reduce((acc, line) => {
    if(line.corruptedChar === ')') acc += 3
    if(line.corruptedChar === ']') acc += 57
    if(line.corruptedChar === '}') acc += 1197
    if(line.corruptedChar === '>') acc += 25137
    return acc
}, 0)}`)

const incompleteLines = lineScans.filter(scan => !scan.corrupted).map( line => {
    const value = line.openTags.reverse().reduce((acc, tag)  => {
        if(tag === '[') acc = (acc * 5) + 2
        if(tag === '(') acc = (acc * 5) + 1
        if(tag === '{') acc = (acc * 5 )+ 3
        if(tag === '<') acc = (acc * 5) + 4
        return acc
    }, 0)
    console.log(`Value: ${value}`)
    return value
})
console.log(`The answer is: ${incompleteLines.sort((a, b) => a - b)[Math.floor(incompleteLines.length/2)]}`)

