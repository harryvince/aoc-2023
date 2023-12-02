import { readFileSync } from "fs";
import { join } from "path";

const lines = readFileSync(join(__dirname, "input.txt"), "utf-8").split(/\n/);
// Adding extra item to array for some reason
lines.pop();

let challenge1 = 0;
let challenge2 = 0;
lines.forEach((line) => {
  const splitLine = line.split(":");
  const gameNumber = parseInt(splitLine[0].replace("Game", "").trim());

  const cubes = splitLine[1].split(/,|;/);

  const cubeCount = { blue: 0, red: 0, green: 0 };
  type cubeCountKey = keyof typeof cubeCount;
  cubes.forEach((cube) => {
    cube = cube.trim();
    const cubeInfo = cube.split(" ");
    const count = parseInt(cubeInfo[0]);
    const colour = cubeInfo[1] as cubeCountKey;
    if (cubeCount[colour] < count) cubeCount[colour] = count;
  });

  if (cubeCount.red < 13 && cubeCount.green < 14 && cubeCount.blue < 15)
    challenge1 += gameNumber;
    
  challenge2 += (cubeCount.red * cubeCount.blue * cubeCount.green)
});

console.log(`Challenge 1 => ${challenge1}`);
console.log(`Challenge 2 => ${challenge2}`);
