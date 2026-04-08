export enum Answer {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
}

export type ComparisonResult = {
  question: string;
  left: string;
  right: string;
  differences: number;
  correctAnswer: Answer;
};

export enum GenerationType {
  WORDS = "words",
  CHARS_MIXED = "characters-mixed",
  CHARS_LETTERS_ONLY = "characters-letters-only",
  CHARS_NUMBERS_ONLY = "characters-numbers-only",
  CHARS_SYMBOLS_ONLY = "characters-symbols-only",
}

export enum MutationType {
  INSERT = "insert",
  DELETE = "delete",
  REPLACE = "replace",
}

export interface ComparisonBase {
  base: string[];
}

export interface ComparisonItem extends ComparisonBase {
  generationType: GenerationType;
  mutatedBase: string[];
  mutationCount: number;
  mutations: MutationResult[];
}

export interface GeneratedBase extends Omit<
  ComparisonItem,
  "mutatedBase" | "mutationCount" | "mutations"
> {}

export interface GenerationOptions {
  length: number;
}

export interface GenerationResult extends ComparisonBase {
  generationType: GenerationType;
}

export interface MutationOptions extends ComparisonBase {
  generationType: GenerationType;
  index: number;
}

export interface MutationResult extends ComparisonBase {
  mutatedBase: string[];
  mutationType: MutationType;
}

export interface ComparisonGeneratorOptions {
  count: number;
  length: number;
  minMutation: number;
  maxMutation: number;
  generationTypes: GenerationType[];
  mutationTypes: MutationType[];
}

export interface Config extends ComparisonGeneratorOptions {
  key?: string;
  timer: number;
}
