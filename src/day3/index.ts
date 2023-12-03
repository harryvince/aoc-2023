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
      challenge1 += parseInt(lineInformation.partNumber)
  }
}

console.log(`Challenge 1 => ${challenge1}`);
