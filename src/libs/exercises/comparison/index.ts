import { randomInt } from "@/utils/common";

import {
  ComparisonItem,
  GeneratedBase,
  GenerationOptions,
  GenerationResult,
  GenerationType,
  ComparisonGeneratorOptions,
  MutationOptions,
  MutationResult,
  MutationType,
} from "@/types/exercises/comparison";

import { generate } from "random-words";

/*  Pipeline for generating questions for comparision exercise
 *  TBD...
 */

const generatorHandlers = {
  [GenerationType.WORDS]: generateWords,
  [GenerationType.CHARS_MIXED]: generateMixed,
  [GenerationType.CHARS_LETTERS_ONLY]: generateChars,
  [GenerationType.CHARS_NUMBERS_ONLY]: generateNumbers,
  [GenerationType.CHARS_SYMBOLS_ONLY]: generateSymbols,
};

const mutationHandlers = {
  [MutationType.INSERT]: mutateInsert,
  [MutationType.DELETE]: mutateDelete,
  [MutationType.REPLACE]: mutateReplace,
};

export function generateComparisonExercise(
  options: Partial<ComparisonGeneratorOptions> = {}
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

  const mutatedBases: ComparisonItem[] = generatedBases.map((item) => {
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

export function generateWords(
  options: Partial<GenerationOptions> = {}
): GenerationResult {
  const { length = 1 } = options;
  const generatedWords = generate({ exactly: length, join: "," });
  return {
    base: generatedWords.split(","),
    generationType: GenerationType.WORDS,
  };
}

export function generateChars(
  options: Partial<GenerationOptions> = {}
): GenerationResult {
  const { length = 1 } = options;
  const generatedChars = Array.from({ length }, () =>
    String.fromCharCode(randomInt(97, 122))
  ).join(",");
  return {
    base: generatedChars.split(","),
    generationType: GenerationType.CHARS_LETTERS_ONLY,
  };
}

export function generateNumbers(
  options: Partial<GenerationOptions> = {}
): GenerationResult {
  const { length = 1 } = options;
  return {
    base: Array.from({ length }, () => randomInt(0, 9).toString()),
    generationType: GenerationType.CHARS_NUMBERS_ONLY,
  };
}

export function generateSymbols(
  options: Partial<GenerationOptions> = {}
): GenerationResult {
  const { length = 1 } = options;
  return {
    base: Array.from({ length }, () => String.fromCharCode(randomInt(33, 47))),
    generationType: GenerationType.CHARS_SYMBOLS_ONLY,
  };
}

export function generateMixed(
  options: Partial<GenerationOptions> = {}
): GenerationResult {
  const { length = 1 } = options;
  const mixedGenerator = [generateChars, generateNumbers, generateSymbols];

  const mixed = Array.from({ length }, () => {
    const generator = mixedGenerator[randomInt(0, mixedGenerator.length - 1)];
    return generator().base;
  });

  return { base: mixed.flat(), generationType: GenerationType.CHARS_MIXED };
}

export function mutateInsert(options: MutationOptions): MutationResult {
  const { base, generationType, index } = options;
  const mutatedBase = [...base];
  let toAdd: string | undefined;
  while (!toAdd || base.includes(toAdd)) {
    const candidates = generatorHandlers[generationType]().base;
    toAdd = candidates.length > 0 ? candidates[0] : undefined;
  }
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

export function mutateDelete(options: MutationOptions): MutationResult {
  const { base, index } = options;
  const mutatedBase = [...base];
  mutatedBase[index] = "";
  return {
    base: base,
    mutatedBase: mutatedBase,
    mutationType: MutationType.DELETE,
  };
}

export function mutateReplace(options: MutationOptions): MutationResult {
  // TODO: Handle to replace where there maybe difficult to differenciate numbers
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
