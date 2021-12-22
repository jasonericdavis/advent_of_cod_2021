
const args = process.argv.slice(2)

let currentNumber = 1
let rolls = 0
let winningScore = 1000

const player1 = {
    score: 0,
    currentSpace: parseInt(args[0]),
    universes: 1
}

const player2 = {
    score: 0,
    currentSpace: parseInt(args[1]),
    universes: 1
}

while(player1.score < winningScore && player2.score < winningScore) {
    let spacesMoved = currentNumber + (currentNumber + 1) + (currentNumber + 2)
    let newSpace = 0

    if((rolls + 1)%2 === 0 ){
        newSpace = (player2.currentSpace + spacesMoved )%10
        player2.score = newSpace === 0 ? player2.score + 10 : player2.score + newSpace
        player2.currentSpace = newSpace
        player2.universes *= Math.pow(3, rolls + 1)
        console.log(`Player 2: ${player2.score} on space ${player2.currentSpace}`)
    } else {
        newSpace = (player1.currentSpace + spacesMoved )%10
        player1.score = newSpace === 0 ? player1.score + 10 : player1.score + newSpace
        player1.currentSpace = newSpace
        player1.universes *= Math.pow(3, rolls + 1)
        console.log(`Player 1: ${player1.score} on space ${player1.currentSpace}`)
    }
    currentNumber += 3
    rolls++
}

console.log(`${player1.score} points vs ${player2.score} points in ${rolls * 3} rolls`)
console.log(`Player ${player1.score < player2.score? '1': '2'} is the loser `)
console.log(`The answer is ${Math.min(player1.score, player2.score)} * ${rolls * 3} = ${Math.min(player1.score, player2.score) * rolls * 3}`)
