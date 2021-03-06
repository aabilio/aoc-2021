export function part1(input: string): number {
  const game = Game.from(input);
  const allWinners = game.play();
  const { lastNumber, winner } = allWinners[0];

  return calculateScore(lastNumber, winner);
}

export function part2(input: string): number {
  const game = Game.from(input);
  const allWinners = game.play();
  const { lastNumber, winner } = allWinners[allWinners.length - 1];

  return calculateScore(lastNumber, winner);
}

class Bingo {
  private numbers: number[];

  constructor(numbers: number[]) {
    this.numbers = numbers;
  }

  static from(input: string): Bingo {
    return new Bingo(input.split(",").map(Number));
  }

  next(): number | undefined {
    return this.numbers.shift();
  }
}

class CardNumber {
  number: number;
  checked: boolean;

  constructor(number: number) {
    this.number = number;
    this.checked = false;
  }

  static from(number: number): CardNumber {
    return new CardNumber(number);
  }

  check(): void {
    this.checked = true;
  }
}

class BingoBoard {
  public numbers: CardNumber[][];

  constructor(numbers: CardNumber[][]) {
    this.numbers = numbers;
  }

  static from(input: string): BingoBoard {
    const numbers = input.split("\n").map((line) =>
      line
        .split(" ")
        .filter((c) => c !== "")
        .map(Number)
    );

    return new BingoBoard(numbers.map((row) => row.map(CardNumber.from)));
  }

  notify(number: number | undefined): void {
    this.numbers.forEach((row) => {
      row.forEach((cardNumber) => {
        if (cardNumber.number === number) {
          cardNumber.check();
        }
      });
    });
  }

  isComplete(): boolean {
    const isCompleteOnRows = this.numbers.some((row) =>
      row.every((cardNumber) => cardNumber.checked)
    );
    const isCompleteOnColumns = this.transpose(this.numbers).some((column) =>
      column.every((cardNumber) => cardNumber.checked)
    );

    return isCompleteOnRows || isCompleteOnColumns;
  }

  private transpose(matrix: CardNumber[][]): CardNumber[][] {
    return matrix[0].map((_, i) => matrix.map((row) => row[i]));
  }
}

class Game {
  private bingo: Bingo;
  private boards: BingoBoard[];

  constructor(bingo: Bingo, boards: BingoBoard[]) {
    this.bingo = bingo;
    this.boards = boards;
  }

  static from(input: string): Game {
    const bingo = Bingo.from(input.split("\n")[0]);
    const boards = input.split("\n\n").slice(1).map(BingoBoard.from);

    return new Game(bingo, boards);
  }

  play(): { lastNumber: number | undefined; winner: BingoBoard | null }[] {
    const allWinners = [];

    while (true) {
      const number = this.bingo.next();
      if (number === undefined) break;

      const toRemoveIdx: number[] = [];
      for (const [index, board] of this.boards.entries()) {
        board.notify(number);
        if (board.isComplete()) {
          allWinners.push({ lastNumber: number, winner: board });
          toRemoveIdx.push(index);
        }
      }
      this.boards = this.boards.filter((_, idx) => !toRemoveIdx.includes(idx));
    }

    return allWinners.length
      ? allWinners
      : [{ lastNumber: undefined, winner: null }];
  }
}

function calculateScore(
  number: number | undefined,
  winner: BingoBoard | null
): number {
  if (winner === null || number === undefined) return 0;

  const unmarkedNumbersSum = winner.numbers.reduce(
    (acc, row) =>
      acc +
      row.reduce(
        (acc, cardNumber) =>
          cardNumber.checked ? acc : acc + cardNumber.number,
        0
      ),
    0
  );

  return unmarkedNumbersSum * number;
}
