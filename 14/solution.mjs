import {getInput} from '../util/getLines.mjs'

const args = process.argv.slice(2)
const data = getInput('14', args[0])
const [polymerTemplate, rules] = data.split('\n\n')

const pairs = rules.split('\n').map(rule => {
  const [a, b] = rule.split(' ->')
  return {rule: a, insertionChar: b.trim()}
})

console.log(polymerTemplate)
console.log(pairs)
let polymer = polymerTemplate

for(let iterations = 0; iterations < 40; iterations++) {
    console.log(`Iteration ${iterations}`)
    polymer = polymer.split('').reduce((newPolymer, char, index) => {
        if(index === 0) return char
        
        const ruleLookup = `${polymer[index - 1]}${char}`
        const rule = pairs.find(pair => pair.rule === ruleLookup)
        
        if(rule) {
            //console.table({polymer, char, index, front: polymer.slice(0, index), back: polymer.slice(index)})
            newPolymer += [rule.insertionChar, rule.rule[1]].join('')
        }
        return newPolymer
    }, '')
}

console.log(polymer)
const uniqueLetters = {}

pairs.forEach(pair => {
    pair.rule.split('').forEach(letter => {
        if(uniqueLetters[letter]) return
        uniqueLetters[letter] = polymer.split('').filter(polymerLetter => polymerLetter ===  letter).length
    })
})

console.log(uniqueLetters)
const maxCount = Math.max(...Object.values(uniqueLetters))
const minCount = Math.min(...Object.values(uniqueLetters))
console.log(`${maxCount} - ${minCount} = ${maxCount - minCount}`)