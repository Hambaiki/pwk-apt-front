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

export interface Comparison extends ComparisonBase {
  generationType: GenerationType;
  mutatedBase: string[];
  mutationCount: number;
  mutations: MutationResult[];
}

export interface GeneratedBase
  extends Omit<Comparison, "mutatedBase" | "mutationCount" | "mutations"> {}

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
