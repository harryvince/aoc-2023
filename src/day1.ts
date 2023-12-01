import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, './input.txt'),  'utf-8')
const splitInput = input.split('\n')
// Weird empty array when splitting
splitInput.pop()

let challenge1 = 0
splitInput.map(entry => {
    const characters = entry.split('')
    const numbers = characters.filter(number => {
        const parsedValue = parseInt(number)
        if (!isNaN(parsedValue)) return parsedValue
    })
    const [firstNumber, lastNumber] = [numbers[0], numbers[numbers.length -1]]
    challenge1 = challenge1 + parseInt(`${firstNumber}${lastNumber}`)
})

console.log(`Challenge 1 output: ${challenge1}`)
