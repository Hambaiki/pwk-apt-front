export enum GameState {
  START = "start",
  SHOWING = "showing",
  WAITING = "waiting",
  INPUT = "input",
  RESULT = "result",
}

export enum Color {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
  YELLOW = "yellow",
  PURPLE = "purple",
  ORANGE = "orange",
}

export interface Config {
  questionCount: number;
  minLength: number;
  maxLength: number;
}

export interface SequenceQuestion {
  id: number;
  sequence: Color[];
}

export const COLOR_CLASS_MAP: Record<Color, string> = {
  [Color.RED]: "bg-red-500",
  [Color.BLUE]: "bg-blue-500",
  [Color.GREEN]: "bg-green-500",
  [Color.YELLOW]: "bg-yellow-400",
  [Color.PURPLE]: "bg-purple-500",
  [Color.ORANGE]: "bg-orange-500",
};
