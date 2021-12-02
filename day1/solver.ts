export function solver(input: number[]): number {
  const valueBiggerThanMaxInputValue: number = Math.max(...input) + 1;
  const initialAccumulator: { increments: number; lastValue: number } = {
    increments: 0,
    lastValue: valueBiggerThanMaxInputValue,
  };
  return input.reduce(
    (acc, value: number) => ({
      increments: value > acc.lastValue ? acc.increments + 1 : acc.increments,
      lastValue: value,
    }),
    initialAccumulator
  ).increments;
}
