import {
  generateChars,
  generateMixed,
  generateNumbers,
  generateSymbols,
  generateWords,
  mutateDelete,
  mutateInsert,
  mutateReplace,
} from "@/libs/exercises/comparison";

import { Choice } from "@/types/exercises";
import {
  GenerationOptions,
  GenerationType,
  MutationOptions,
  MutationType,
} from "@/types/exercises/comparison";

export const comparionGenerators: Record<
  GenerationType,
  {
    title: string;
    description: string;
    handler: (options?: GenerationOptions) => void;
  }
> = {
  [GenerationType.WORDS]: {
    title: "Word Generator",
    description:
      "Generates random words to be used as the base for comparison exercises.",
    handler: generateWords,
  },
  [GenerationType.CHARS_MIXED]: {
    title: "Mixed Characters Generator",
    description:
      "Generates a sequence containing a mix of letters, numbers, and symbols.",
    handler: generateMixed,
  },
  [GenerationType.CHARS_LETTERS_ONLY]: {
    title: "Letters-Only Generator",
    description:
      "Generates a sequence containing only alphabetic characters (A-Z).",
    handler: generateChars,
  },
  [GenerationType.CHARS_NUMBERS_ONLY]: {
    title: "Numbers-Only Generator",
    description: "Generates a sequence containing only numeric digits (0-9).",
    handler: generateNumbers,
  },
  [GenerationType.CHARS_SYMBOLS_ONLY]: {
    title: "Symbols-Only Generator",
    description:
      "Generates a sequence containing only special characters and symbols.",
    handler: generateSymbols,
  },
};

export const comparisonMutators: Record<
  MutationType,
  {
    title: string;
    description: string;
    handler: (options: MutationOptions) => void;
  }
> = {
  [MutationType.INSERT]: {
    title: "Insert Mutation",
    description:
      "Randomly inserts new characters into the sequence to increase complexity.",
    handler: mutateInsert,
  },
  [MutationType.DELETE]: {
    title: "Delete Mutation",
    description:
      "Randomly removes characters from the sequence to alter its structure.",
    handler: mutateDelete,
  },
  [MutationType.REPLACE]: {
    title: "Replace Mutation",
    description:
      "Randomly replaces existing characters with new ones to introduce variation.",
    handler: mutateReplace,
  },
};

export const comparisonAnswers = {
  [Choice.A]: {
    description: "No mutations",
    check: (count: number) => count === 0,
  },
  [Choice.B]: {
    description: "One mutation",
    check: (count: number) => count === 1,
  },
  [Choice.C]: {
    description: "Two mutations",
    check: (count: number) => count === 2,
  },
  [Choice.D]: {
    description: "Three mutations",
    check: (count: number) => count === 3,
  },
  [Choice.E]: {
    description: "Four mutations",
    check: (count: number) => count === 4,
  },
  [Choice.F]: {
    description: "Five or more mutations",
    check: (count: number) => count >= 5,
  },
};
