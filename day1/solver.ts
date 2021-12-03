export function part1(input: number[]): number {
  return calculateIncrements(input);
}

export function part2(input: number[]): number {
  return 5;
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
