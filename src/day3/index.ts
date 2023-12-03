import { readFileSync } from "fs";
import { join } from "path";

const lines = readFileSync(join(__dirname, "input.txt"), "utf-8").split(/\n/);
lines.pop();

const checkForSymbol = (line: string, index: number) => {
  const subString =
    index === 0
      ? line.substring(index, 2)
      : line.substring(index - 1, index + 2);
  let limit = 0;
  let foundSymbol = false;
  while (limit < 3) {
    subString.split("").forEach((char) => {
      if (char !== "." && isNaN(parseInt(char))) foundSymbol = true;
      limit += 1;
    });
  }
  return foundSymbol;
};

const checkForNumber = (line: string, index: number) => {
  const characters = line.split("");
  const [left, right] = [index - 1, index + 1];

  const checkLeft = () => {
    let number = "";
    for (let i = left; i >= 0; i--) {
      const parsedValue = parseInt(characters[i]);
      if (!isNaN(parsedValue)) number = String(parsedValue) + number;
      else break;
    }
    return number;
  };

  const checkRight = () => {
    let number = "";
    for (let i = right; i < line.length; i++) {
      const parsedValue = parseInt(characters[i]);
      if (!isNaN(parsedValue)) number += String(parsedValue);
      else break;
    }
    return number;
  };

  let numbers = [];
  const directIndex = characters[index];
  if (!isNaN(parseInt(directIndex))) {
    let number = directIndex;
    number = checkLeft() + number + checkRight();
    numbers.push(number);
  } else {
    const [leftNum, rightNum] = [checkLeft(), checkRight()];
    numbers.push(leftNum, rightNum);
  }
  numbers = numbers.filter((item) => item);
  return numbers;
};

let challenge1 = 0;
for (let i = 0; i < lines.length; i++) {
  const characters = lines[i].split("");
  const lineInformation = {
    surroundingSymbol: false,
    partNumber: "",
  };
  characters.forEach((character, index) => {
    const parsedValue = parseInt(character);
    if (!isNaN(parsedValue)) {
      lineInformation.partNumber += String(parsedValue);
      if (!lineInformation.surroundingSymbol) {
        if (i !== 0) {
          const previousLine = checkForSymbol(lines[i - 1], index);
          if (previousLine) lineInformation.surroundingSymbol = true;
        }
        if (i < lines.length - 1) {
          const nextLine = checkForSymbol(lines[i + 1], index);
          if (nextLine) lineInformation.surroundingSymbol = true;
        }
      }
    } else {
      const partNumber = parseInt(lineInformation.partNumber);

      if (!isNaN(partNumber)) {
        if (character !== "." || lineInformation.surroundingSymbol) {
          lineInformation.surroundingSymbol = false;
          lineInformation.partNumber = "";
          challenge1 += partNumber;
        }
      }

      if (character !== ".") lineInformation.surroundingSymbol = true;
      else {
        lineInformation.partNumber = "";
        lineInformation.surroundingSymbol = false;
      }
    }
  });

  if (lineInformation.surroundingSymbol) {
    challenge1 += parseInt(lineInformation.partNumber);
  }
}

let challenge2 = 0;
for (let i = 0; i < lines.length; i++) {
  const characters = lines[i].split("");
  characters.forEach((character, index) => {
    let surroundingNumbers: Array<string> = [];
    if (character === "*") {
      if (i !== 0) {
        const topLine = checkForNumber(lines[i - 1], index);
        surroundingNumbers = surroundingNumbers.concat(topLine);
      }
      if (i < lines.length - 1) {
        const bottomLine = checkForNumber(lines[i + 1], index);
        surroundingNumbers = surroundingNumbers.concat(bottomLine);
      }
      surroundingNumbers = surroundingNumbers.concat(
        checkForNumber(lines[i], index),
      );
    }
    if (surroundingNumbers.length === 2) {
      challenge2 +=
        parseInt(surroundingNumbers[0]) * parseInt(surroundingNumbers[1]);
    }
  });
}

console.log(`Challenge 1 => ${challenge1}`);
console.log(`Challenge 2 => ${challenge2}`);
