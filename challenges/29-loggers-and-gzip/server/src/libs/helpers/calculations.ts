interface IRandomNum {
  [number: string]: number; // ex. {"1002": 3,} where 3 is the number of times the number "1002" is repeated
}

process.on("message", (qty: string): void => {
  if (process.send) process.send(randomNum(qty));
});

export function getRandomInt(min: number, max: number): string {
  return `${Math.floor(Math.random() * (max - min)) + min}`;
}
export function randomNum(qty: string): IRandomNum {
  const totalNumbers: IRandomNum = {};

  for (let i: number = 0; i < parseInt(qty); i++) {
    const random = getRandomInt(1, 1000);
    if (random in totalNumbers) totalNumbers[random] = totalNumbers[random] + 1;
    else totalNumbers[random] = 1;
  }

  return totalNumbers;
}
