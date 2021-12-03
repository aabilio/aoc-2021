import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

import { part1, part2 } from "./solver.ts";

Deno.test("Part 1", () => {
  const input = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2",
  ];
  const actual = part1(input);
  const expected = 150;

  assertEquals(actual, expected);
});

Deno.test("Part 2", () => {
  const input = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2",
  ];
  const actual = part2(input);
  const expected = 900;

  assertEquals(actual, expected);
});
