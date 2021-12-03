export function part1(input: number[]): number {
  return calculateIncrements(input);
}

export function part2(input: number[]): number {
  const windows = windowedSlice(input, 3);
  const data = windows.map((window) => sum(window));
  return calculateIncrements(data);
}

function calculateIncrements(numbers: number[]): number {
  const valueBiggerThanMaxInputValue: number = Math.max(...numbers) + 1;
  const initialAccumulator: { increments: number; lastValue: number } = {
    increments: 0,
    lastValue: valueBiggerThanMaxInputValue,
  };
  return numbers.reduce(
    (acc, value: number) => ({
      increments: value > acc.lastValue ? acc.increments + 1 : acc.increments,
      lastValue: value,
    }),
    initialAccumulator
  ).increments;
}

function windowedSlice(array: number[], windowSize: number): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < array.length - windowSize + 1; i++) {
    result.push(array.slice(i, i + windowSize));
  }
  return result;
}

function sum(array: number[]): number {
  return array.reduce((acc, value) => acc + value);
}
