export function part1(input: string[]): number {
  const commands = commandsFromInputsLines(input);
  const submarine = new Submarine();
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

function commandsFromInputsLines(input: string[]): ICommand[] {
  return input.map((line) => ({
    direction: line.split(" ")[0] as CommandDirection,
    distance: parseInt(line.split(" ")[1]),
  }));
}

class Submarine implements ISubmarine {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }

  private forward(distance: number) {
    this.y += distance;
  }

  private down(distance: number) {
    this.x += distance;
  }

  private up(distance: number) {
    this.x -= distance;
  }

  run(commands: ICommand[]) {
    commands.forEach((command) => this[command.direction](command.distance));
  }
}
