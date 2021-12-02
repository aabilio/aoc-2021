import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";

import { solver } from "./solver.ts";

Deno.test("Part 1", () => {
  const input = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  const actual = solver(input);
  const expected = 7;

  assertEquals(actual, expected);
});
