export async function readFile(path: string): Promise<string> {
  return await Deno.readTextFile(path);
}

export async function readLinesFromFile(path: string): Promise<string[]> {
  return (await readFile(path)).split("\n");
}

export async function readNumbersFromFile(path: string): Promise<number[]> {
  return (await readLinesFromFile(path)).map((line) => parseInt(line));
}
