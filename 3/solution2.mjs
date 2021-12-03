import {getLines} from '../util/getLines.mjs'
const lines = getLines("3",'input.txt');

const determineRating = (ratings, ratingSize, filterCallback) => {
    while(ratings.length > 1) {
        for(let bitIndex=0;bitIndex<ratingSize ;bitIndex++){
            ratings = filterCallback(ratings, bitIndex);
            if(ratings.length === 1) return ratings
        }
    }
}

const oxygenGeneratorRating = determineRating([...lines], lines[0].length, (ratings, bitIndex) => {
    const zeroBits = ratings.filter(line=> line[bitIndex]==='0').length;
    return (zeroBits > ratings.length/2 ? ratings.filter(line => line[bitIndex] === '0') : ratings.filter(line => line[bitIndex] === '1'))
})

const co2scrubberRating = determineRating([...lines], lines[0].length, (ratings, bitIndex) => {
    const zeroBits = ratings.filter(line=> line[bitIndex]==='0').length;
    return (zeroBits <= ratings.length/2 ? ratings.filter(line => line[bitIndex] === '0') : ratings.filter(line => line[bitIndex] === '1'))
})

console.log(`oxygenGeneratorRating: ${oxygenGeneratorRating}`)
console.log(`C02scrubberRating: ${co2scrubberRating}`)
console.log(`Life Support Rating: ${parseInt(oxygenGeneratorRating.join(''),2) * parseInt(co2scrubberRating.join(''),2)}`)