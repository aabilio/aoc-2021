import { readFile } from "../utils/file.ts";
import { part1, part2 } from "./solver.ts";

const input = await readFile("day4/input.txt");

const result1 = part1(input);
console.log("Result 1: ", result1);

const result2 = part2(input);
console.log("Result 2: ", result2);
