export function part1(input: string[]): number {
  const diagnostic = new SubmarineDiagnostic(input);

  return diagnostic.powerConsumption;
}

export function part2(input: string[]): number {
  const diagnostic = new SubmarineDiagnostic(input);

  return diagnostic.lifeSupportRating;
}

class SubmarineDiagnostic {
  private data: number[][];

  constructor(input: string[]) {
    this.data = this.linesToMatrix(input);
  }

  get powerConsumption(): number {
    const powerConsumptionDiagnose = new PowerConsumptionDiagnose();
    return powerConsumptionDiagnose.execute(this.data);
  }

  get lifeSupportRating(): number {
    const lifeSupportRatingDiagnose = new LifeSupportRatingDiagnose();
    return lifeSupportRatingDiagnose.execute(this.data);
  }

  private linesToMatrix(lines: string[]): number[][] {
    return lines.map((row) => row.split("").map(this.toNumber));
  }

  private toNumber(str: string): number {
    return +str;
  }
}

class PowerConsumptionDiagnose {
  execute(data: number[][]) {
    const binaryGamma = this.transpose(data).map(this.mostRepeated);
    const gamma = BitsUtils.arrayToDecimal(binaryGamma);
    const epsilon = BitsUtils.arrayToDecimal(this.invertBits(binaryGamma));

    return gamma * epsilon;
  }

  private transpose(matrix: number[][]): number[][] {
    return matrix[0].map((_, i) => matrix.map((row) => row[i]));
  }

  private mostRepeated(bits: number[]): number {
    const total = bits.reduce((acc, curr) => acc + curr, 0);
    return total > bits.length / 2 ? 1 : 0;
  }

  private invertBits(bits: number[]): number[] {
    return bits.map((bit) => bit ^ 1);
  }
}

class LifeSupportRatingDiagnose {
  execute(input: number[][]): number {
    const oxygenGeneratorRating = this.calculateOxygenGeneratorRating(input);
    const co2ScrubberRating = this.calculateCO2ScrubberRating(input);

    return oxygenGeneratorRating * co2ScrubberRating;
  }

  private calculateOxygenGeneratorRating(input: number[][]): number {
    return this.calculate(input, this.mostRepeatedOnColumn);
  }

  private calculateCO2ScrubberRating(input: number[][]): number {
    return this.calculate(input, this.lessRepeatedOnColumn);
  }

  private calculate(
    input: number[][],
    bitFinderStrategy: (data: number[][], column: number) => number
  ): number {
    let data = this.shadowCopy(input);
    let idx = 0;
    while (data.length > 1) {
      const commonBit = bitFinderStrategy(data, idx);
      data = this.filterByColumn(data, commonBit, idx);
      idx += 1;
    }

    return BitsUtils.arrayToDecimal(data[0]);
  }

  private shadowCopy(data: number[][]): number[][] {
    return data.map((row) => [...row]);
  }

  private mostRepeatedOnColumn(data: number[][], column: number): number {
    const total = data.reduce((acc, row) => acc + row[column], 0);
    return total >= data.length / 2 ? 0 : 1;
  }

  private lessRepeatedOnColumn(data: number[][], column: number): number {
    const total = data.reduce((acc, row) => acc + row[column], 0);
    return total >= data.length / 2 ? 1 : 0;
  }

  private filterByColumn(
    data: number[][],
    commonBit: number,
    column: number
  ): number[][] {
    return data.filter((row) => row[column] === commonBit);
  }
}

class BitsUtils {
  static arrayToDecimal(bits: number[]): number {
    return parseInt(bits.toString().replaceAll(",", ""), 2);
  }
}
