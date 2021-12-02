import { readNumbersFromFile } from "../utils/file.ts";
import { solver } from "./solver.ts";

const input = await readNumbersFromFile("day1/input.txt");
const result = solver(input);
console.log("Result: ", result);
