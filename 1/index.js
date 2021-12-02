const fs = require('fs')
const path = require('path')

const getLines = (filePath) => {
    const file = fs.readFileSync(filePath, 'utf8')
    return file.split('\n')
}

const findLargerMeasurements = (lines) => {
    return lines.reduce((acc, line, index) => {
        if(index > 0 && Number(line) > Number(lines[index - 1])) acc++
        return acc
    }, 0)
}

const input1Lines = getLines(path.join(__dirname, 'input1.txt'));
console.log(`${findLargerMeasurements(input1Lines)} measurements incrased`)



const measurements = []
const input2Lines = getLines(path.join(__dirname, 'input2.txt'));
input2Lines.map((line, index) => {
    if(index + 3 <= input2Lines.length) {
        measurements.push(Number(line) + Number(input2Lines[index + 1]) + Number(input2Lines[index + 2]))
    }
})
console.log(`${findLargerMeasurements(measurements)} measurements increased`)