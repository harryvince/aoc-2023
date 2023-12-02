import { readFileSync } from "fs";
import { join } from "path";

const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const input = readFileSync(join(__dirname, './input.txt'),  'utf-8')
const splitInput = input.split('\n')
// Weird empty array when splitting
splitInput.pop()

const getFinalOutput = (entry: string) => {
    const characters = entry.split('')
    const numbers = characters.filter(number => {
        const parsedValue = parseInt(number)
        if (!isNaN(parsedValue)) return parsedValue
    })
    const [firstNumber, lastNumber] = [numbers[0], numbers[numbers.length -1]]
    return parseInt(`${firstNumber}${lastNumber}`)
}

let challenge1 = 0
splitInput.map(entry => {
    const value = getFinalOutput(entry)
    challenge1 += value
})

let challenge2 = 0
splitInput.map(entry => {
    const numberAppearance: Array<{ index: number, value: number }> = []
    numbers.forEach((number, value) => {
        let tmpEntryValue = entry
        while (true) { 
            if (entry.includes(number)) {
                const sliceDifference = entry.length - tmpEntryValue.length
                const firstCharacterOfApperance = tmpEntryValue.indexOf(number)
                if (firstCharacterOfApperance === -1) break
                numberAppearance.push({ 
                    index: firstCharacterOfApperance + sliceDifference, 
                    value 
                })
                tmpEntryValue = tmpEntryValue.slice(firstCharacterOfApperance + 1)
            } else break
        }
    })

    numberAppearance.forEach(appearance => {
        const tmpEntryValue = entry.split('')
        tmpEntryValue[appearance.index] = String(appearance.value)
        entry = tmpEntryValue.join('')
    })

    const value = getFinalOutput(entry)
    challenge2 += value
})

console.log(`Challenge 1 output: ${challenge1}`)
console.log(`Challenge 2 output: ${challenge2}`)
