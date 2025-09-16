export enum InputType {
  LETTER = "letter",
  SYMBOL = "symbol",
  NUMBER = "number",
  EMPTY = "empty",
}

export interface Config {
  memoryTime: number; // in seconds
  timeLimit: number; // in seconds
  letterCount: number;
  symbolCount: number;
  numberCount: number;
  letterVariations: number;
  symbolVariations: number;
  numberVariations: number;
}

export interface GridItem {
  type: InputType;
  value: string;
}
