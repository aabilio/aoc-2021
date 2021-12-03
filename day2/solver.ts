export function part1(input: string[]): number {
  const commands = commandsFromInputsLines(input);
  const submarine = new Submarine();
  submarine.run(commands);

  return submarine.x * submarine.y;
}

export function part2(input: string[]): number {
  const commands = commandsFromInputsLines(input);
  const submarine = new AdvancedSubmarine();
  submarine.run(commands);

  return submarine.x * submarine.y;
}

type CommandDirection = "forward" | "down" | "up";

interface ICommand {
  direction: CommandDirection;
  distance: number;
}

interface ISubmarine {
  x: number;
  y: number;
  run: (commands: ICommand[]) => void;
}

interface IAdvancedSubmarine extends ISubmarine {
  aim: number;
}

function commandsFromInputsLines(input: string[]): ICommand[] {
  return input.map((line) => ({
    direction: line.split(" ")[0] as CommandDirection,
    distance: parseInt(line.split(" ")[1]),
  }));
}

abstract class AbstractSubamarine implements ISubmarine {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }

  abstract forward(distance: number): void;
  abstract down(distance: number): void;
  abstract up(distance: number): void;

  run(commands: ICommand[]) {
    commands.forEach((command) => this[command.direction](command.distance));
  }
}

class Submarine extends AbstractSubamarine {
  forward(distance: number) {
    this.y += distance;
  }

  down(distance: number) {
    this.x += distance;
  }

  up(distance: number) {
    this.x -= distance;
  }
}

class AdvancedSubmarine
  extends AbstractSubamarine
  implements IAdvancedSubmarine
{
  aim: number;

  constructor() {
    super();
    this.aim = 0;
  }

  forward(distance: number) {
    this.x += distance;
    this.y += this.aim * distance;
  }

  down(distance: number) {
    this.aim += distance;
  }

  up(distance: number) {
    this.aim -= distance;
  }
}
