import { readFile } from "../utils/file.ts";
import { part1 } from "./solver.ts";

const input = await readFile("day3/input.txt");

const result1 = part1(input);
console.log("Result 1: ", result1);
