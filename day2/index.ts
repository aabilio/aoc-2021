import { readLinesFromFile } from "../utils/file.ts";
import { part1 } from "./solver.ts";

const input = await readLinesFromFile("day1/input.txt");

const result1 = part1(input);
console.log("Result 1: ", result1);
