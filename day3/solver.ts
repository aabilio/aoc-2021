export function part1(input: string[]): number {
  const diagnostic = new SubmarineDiagnostic(input);

  return diagnostic.powerConsumption;
}

class SubmarineDiagnostic {
  gamma: number;
  epsilon: number;

  constructor(input: string[]) {
    this.gamma = 0;
    this.epsilon = 0;

    this.processReport(input);
  }

  get powerConsumption(): number {
    return this.gamma * this.epsilon;
  }

  private processReport(input: string[]) {
    const matrix: number[][] = this.linesToMatrix(input);
    const matrixTransposed: number[][] = this.transpose(matrix);
    const binaryGamma = matrixTransposed.map(this.mostRepeated);
    this.gamma = this.arrayBitsToDec(binaryGamma);
    this.epsilon = this.arrayBitsToDec(this.invertBits(binaryGamma));
  }

  private linesToMatrix(lines: string[]): number[][] {
    return lines.map((row) => row.split("").map(this.toNumber));
  }
  private toNumber(str: string): number {
    return +str;
  }

  private transpose(matrix: number[][]): number[][] {
    return matrix[0].map((_, i) => matrix.map((row) => row[i]));
  }

  private mostRepeated(bits: number[]): number {
    const total = bits.reduce((acc, curr) => acc + curr, 0);
    return total > bits.length / 2 ? 1 : 0;
  }

  private arrayBitsToDec(bits: number[]): number {
    return parseInt(bits.toString().replaceAll(",", ""), 2);
  }

  private invertBits(bits: number[]): number[] {
    return bits.map((bit) => bit ^ 1);
  }
}
