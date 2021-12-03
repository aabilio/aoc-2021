import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

import { part1, part2 } from "./solver.ts";

Deno.test("Part 1", () => {
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  const actual = part1(input);
  const expected = 7;

  assertEquals(actual, expected);
});

Deno.test("Part 2", () => {
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  const actual = part2(input);
  const expected = 5;

  assertEquals(actual, expected);
});
