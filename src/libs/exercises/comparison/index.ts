import { randomInt } from "@/utils/common";

import { GenerationType, MutationType } from "@/types/exercises/comparison";

import { generate } from "random-words";

/*  Pipeline for generating questions for comparision exercise
 *  TBD...
 */

interface ComparisonBase {
  base: string[];
}

export interface Comparison extends ComparisonBase {
  generationType: GenerationType;
  mutatedBase: string[];
  mutationCount: number;
  mutations: MutationResult[];
}

interface GeneratedBase
  extends Omit<Comparison, "mutatedBase" | "mutationCount" | "mutations"> {}

interface GenerationOptions {
  length?: number;
}

interface GenerationResult extends ComparisonBase {
  generationType: GenerationType;
}

interface MutationOptions extends GenerationResult {
  index: number;
}

interface MutationResult extends ComparisonBase {
  mutatedBase: string[];
  mutationType: MutationType;
}

const generatorHandlers = {
  [GenerationType.WORDS]: generateWords,
  [GenerationType.MIXED]: generateMixed,
  [GenerationType.CHARS_ONLY]: generateChars,
  [GenerationType.NUMBERS_ONLY]: generateNumbers,
  [GenerationType.SYMBOLS_ONLY]: generateSymbols,
};

const mutationHandlers = {
  [MutationType.INSERT]: mutateInsert,
  [MutationType.DELETE]: mutateDelete,
  [MutationType.REPLACE]: mutateReplace,
};

export function generateComparisonExercise(
  options: {
    count?: number;
    length?: number;
    minMutation?: number;
    maxMutation?: number;
    generationTypes?: GenerationType[];
    mutationTypes?: MutationType[];
  } = {}
) {
  const {
    count = 1,
    length = 1,
    minMutation = 0,
    maxMutation = 6,
    generationTypes = Object.values(GenerationType),
    mutationTypes = Object.values(MutationType),
  } = options;

  const sampledTypes = Array.from({ length: count }, () => {
    const type = generationTypes[randomInt(0, generationTypes.length - 1)];
    return type;
  });

  const generatedBases: GeneratedBase[] = sampledTypes.map((type) => {
    const generation = generatorHandlers[type]({ length });
    return {
      ...generation,
    };
  });

  const mutatedBases: Comparison[] = generatedBases.map((item) => {
    const { base } = item;

    const maxMutationCount: number = randomInt(minMutation, maxMutation);
    const mutations: MutationResult[] = [];

    let actualMutationCount: number = 0;
    let mutatedBase: string[] = [...base];

    for (let i = 0; i < mutatedBase.length; i++) {
      if (actualMutationCount >= maxMutationCount) break;

      const shouldMutate =
        Math.random() < maxMutationCount / mutatedBase.length;
      if (!shouldMutate) continue;

      const sampledType = mutationTypes[randomInt(0, mutationTypes.length - 1)];
      const mutationResult = mutationHandlers[sampledType]({
        base: mutatedBase,
        generationType: item.generationType,
        index: i,
      });

      mutations.push(mutationResult);

      mutatedBase = mutationResult.mutatedBase;
      actualMutationCount++;
    }

    return {
      ...item,
      mutatedBase: mutatedBase,
      mutationCount: actualMutationCount,
      mutations: mutations,
    };
  });

  return mutatedBases;
}

function generateWords(options: GenerationOptions = {}): GenerationResult {
  const { length = 1 } = options;
  const generatedWords = generate({ exactly: length, join: "," });
  return {
    base: generatedWords.split(","),
    generationType: GenerationType.WORDS,
  };
}

function generateChars(options: GenerationOptions = {}): GenerationResult {
  const { length = 1 } = options;
  const generatedChars = Array.from({ length }, () =>
    String.fromCharCode(randomInt(97, 122))
  ).join(",");
  return {
    base: generatedChars.split(","),
    generationType: GenerationType.CHARS_ONLY,
  };
}

function generateNumbers(options: GenerationOptions = {}): GenerationResult {
  const { length = 1 } = options;
  return {
    base: Array.from({ length }, () => randomInt(0, 9).toString()),
    generationType: GenerationType.NUMBERS_ONLY,
  };
}

function generateSymbols(options: GenerationOptions = {}): GenerationResult {
  const { length = 1 } = options;
  return {
    base: Array.from({ length }, () => String.fromCharCode(randomInt(33, 47))),
    generationType: GenerationType.SYMBOLS_ONLY,
  };
}

function generateMixed(options: GenerationOptions = {}): GenerationResult {
  const { length = 1 } = options;
  const mixedGenerator = [generateChars, generateNumbers, generateSymbols];

  const mixed = Array.from({ length }, () => {
    const generator = mixedGenerator[randomInt(0, mixedGenerator.length - 1)];
    return generator().base;
  });

  return { base: mixed.flat(), generationType: GenerationType.MIXED };
}

// Modifications for bases

function mutateInsert(options: MutationOptions): MutationResult {
  const { base, generationType: type, index } = options;
  const mutatedBase = [...base];
  const toAdd = generatorHandlers[type]().base;
  mutatedBase.splice(
    index,
    1,
    toAdd.length > 0 ? toAdd[0] : mutatedBase[index]
  );
  return {
    base: base,
    mutatedBase: mutatedBase,
    mutationType: MutationType.INSERT,
  };
}

function mutateDelete(options: MutationOptions): MutationResult {
  const { base, index } = options;
  const mutatedBase = [...base];
  mutatedBase[index] = "";
  return {
    base: base,
    mutatedBase: mutatedBase,
    mutationType: MutationType.DELETE,
  };
}

function mutateReplace(options: MutationOptions): MutationResult {
  const { base, index } = options;
  const mutatedBase = [...base];
  let toReplace: string | undefined;
  while (!toReplace || toReplace === mutatedBase[index]) {
    const candidates = generatorHandlers[options.generationType]().base;
    toReplace = candidates.length > 0 ? candidates[0] : undefined;
  }
  mutatedBase.splice(index, 1, toReplace);
  return {
    base: base,
    mutatedBase: mutatedBase,
    mutationType: MutationType.REPLACE,
  };
}
