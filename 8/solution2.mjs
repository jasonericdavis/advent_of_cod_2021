import {getInput} from '../util/getLines.mjs'

const args = process.argv.slice(2)
const data = getInput('8', args[0])

// This is a very brute force solution but it works
const createDigits = (values) => {
    const digits = {
        one: values.filter(val => val.length === 2),
        four: values.filter(val => val.length === 4),
        seven: values.filter(val => val.length === 3),
        eight: values.filter(val => val.length === 7)
    }
    
    digits.nine = values.filter(
        val => {
            return val.length === 6 && digits.four[0].split('').filter(v => val.includes(v)).length === digits.four[0].length
        }
    )
    
    digits.zero = values.filter(
        val => {
            return val.length === 6 && digits.one[0].split('').filter(v => val.includes(v)).length === 2 && val !== digits.nine[0]
        }
    )
    
    digits.six = values.filter(
        val => {
            return val.length === 6 && val !== digits.nine[0] && val !== digits.zero[0]
        }
    )
    
    digits.three = values.filter(
        val => {
            return val.length === 5 && digits.nine[0].split('').filter(v => val.includes(v)).length === digits.four[0].length
        }
    )
    
    digits.five = values.filter(
        val => {
            return val.length === 5 && digits.six[0].split('').filter(v => val.includes(v)).length === digits.six[0].length - 1
        }
    )
    
    digits.three = values.filter(
        val => {
            return val.length === 5 && digits.one[0].split('').filter(v => val.includes(v)).length === digits.one[0].length
        }
    )
    
    digits.two =  values.filter(
        val => {
            return val.length === 5 && val != digits.three && val != digits.five
        }
    )

    return digits
}

const rows = data.split('\n')
let sum = 0

rows.forEach(element => {
    let [patterns, signals] = element.split(' | ')

    // sort by length and then sort the characters within each pattern
    patterns = patterns.split(' ').sort((a,b) => a.length - b.length).map(val => val = val.split('').sort().join(''))

    signals = signals.split(' ').map(val => val = val.split('').sort().join(''))

    const digits = createDigits(patterns)

    //It would be nice if the digits provided the actual number. Then I can iterate thru each digit key to replace the number 
    // but I am not going to do that right now I am going to use a more practical method
    signals = signals.map(signal => { 
        if(digits.zero[0] === signal) {
            return '0'
        } 

        if(digits.one[0] === signal) {
            return '1'
        } 

        if(digits.two[0] === signal) {
            return '2'
        } 

        if(digits.three[0] === signal) {
            return '3'
        } 

        if(digits.four[0] === signal) {
            return '4'
        } 

        if(digits.five[0] === signal) {
            return '5'
        } 

        if(digits.six[0] === signal) {
            return '6'
        } 

        if(digits.seven[0] === signal) {
            return '7'
        } 

        if(digits.eight[0] === signal) {
            return '8'
        } 

        if(digits.nine[0] === signal) {
            return '9'
        } 
    })

    sum += parseInt(signals.join(''))
});

console.log(`The sum is ${sum}`)