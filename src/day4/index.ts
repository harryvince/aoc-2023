import { readFileSync } from "fs";
import { join } from "path";

const lines = readFileSync(join(__dirname, "input.txt"), "utf-8").split(/\n/);
lines.pop();

let challenge1 = 0;
const duplicateCount = lines.map(() => 0);
lines.map((line, index) => {
  const split = line.split(":");
  const numbersSplit = split[1].split("|");
  const [winningNumbers, cardNumbers] = [
    numbersSplit[0]
      .trim()
      .split(" ")
      .filter((Item) => Item)
      .map(Number),
    numbersSplit[1]
      .trim()
      .split(" ")
      .filter((Item) => Item)
      .map(Number),
  ];

  const combinedNumbers = cardNumbers.concat(winningNumbers);
  const filteredNumbers = combinedNumbers.filter((element, index) => {
    return combinedNumbers.indexOf(element) === index;
  });
  const ammountOfWinningNumbers =
    combinedNumbers.length - filteredNumbers.length;

  let score = 0;
  if (ammountOfWinningNumbers > 0) {
    if (ammountOfWinningNumbers === 1) score = 1;
    else {
      score = 1;
      for (let i = 0; i < ammountOfWinningNumbers - 1; i++) {
        score = score * 2;
      }
    }

    const duplicates = duplicateCount[index] + 1;
    for (let i = 1; i < ammountOfWinningNumbers + 1; i++) {
      duplicateCount[index + i] += duplicates;
    }
  }
  challenge1 += score;
});
const challenge2 = duplicateCount.reduce((a, b) => a + b) + lines.length;

console.log(`Challenge 1 => ${challenge1}`);
console.log(`Challenge 2 => ${challenge2}`);
