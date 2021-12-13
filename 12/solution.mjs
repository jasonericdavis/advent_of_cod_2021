import {getLines} from '../util/getLines.mjs'
const args = process.argv.slice(2)
const lines = getLines('12', args[0])

const caves = []

const isLower = (str) =>  /[a-z]/.test(str) && !/[A-Z]/.test(str);

lines.forEach(line => {
    // const [start, end] = line.split('-')
    // caves[start] = caves[start] || []
    // caves[start].push(end)

    // caves[end] = caves[end] || []
    // caves[end].push(start)
    caves.push(line.split('-'))
})

console.log(caves)

const paths = caves.filter(connectors => connectors.includes('start')).sort((a,b) => a === 'sstart' ? -1 : 1)


// caves['start'].map(cave => {
//     const path = ['start',cave]
//     paths.push(path)
// })

let totalPaths = 0
let iteration = 0
let previousEndPaths = 0 // paths.filter(path => path.includes('end')).length

while(previousEndPaths != paths.length && iteration < 4) {
    previousEndPaths = paths.length
    console.log(`Iteration ${iteration}`)
    const newPaths = []

    paths.forEach(path => {
        console.log(`Checkig path ${path}`)
        if(path.includes('end')) return

        const endPoint = path[path.length - 1]

        const connectingCaves = caves.filter(p => p.includes(endPoint)).sort((a,b) => a === endPoint ? 1 : -1)
        

        connectingCaves.forEach((connector, index) => {
            const newConnector = connector.filter(c => c !== endPoint)[0]
            
            if(newConnector === 'start') return
            if(isLower(newConnector) && path.includes(newConnector)) return
            if(newConnector === endPoint) return
            if(endPoint === newConnector) return

            console.log(`New Connector: ${newConnector} for ${endPoint}`)

            if(index === 0) {
                path.push(newConnector)
            } else {
                newPaths.push([...path.slice(0, - 1), newConnector])
            }
        })
    })

    paths.push(...newPaths)

    iteration++
}
console.log(paths)
console.log(`${paths.filter(path => path.includes('end')).length} paths found`)

