import { generate } from "random-words";

import { shuffleArray } from "@/libs/utils/array";
import { randomInt } from "@/libs/utils/number";

export function mutateString(str: string, mutations: number): string {
  let result = str.split("");

  for (let i = 0; i < mutations; i++) {
    const mutationType = randomInt(0, 4);
    const index = randomInt(0, result.length - 1);
    switch (mutationType) {
      case 0: // case change
        result[index] =
          result[index].toLowerCase() === result[index]
            ? result[index].toUpperCase()
            : result[index].toLowerCase();
        break;
      case 1: // substitution
        result[index] = String.fromCharCode(randomInt(33, 126));
        break;
      case 2: // insertion
        result.splice(index, 0, String.fromCharCode(randomInt(33, 126)));
        break;
      case 3: // deletion
        result.splice(index, 1);
        break;
      case 4: // swap adjacent
        if (index < result.length - 1) {
          [result[index], result[index + 1]] = [
            result[index + 1],
            result[index],
          ];
        }
        break;
    }
  }

  return result.join("");
}

export function generateWordSetMutation(
  words: string,
  mutations: number,
): string {
  const wordList = words.split(",");
  const mutated = shuffleArray(wordList).slice(0, wordList.length);
  return mutated.join(",");
}

export function generateComparisonPairsWithBase(
  baseSamples: string[],
): [string, string][] {
  const pairs: [string, string][] = [];
  for (let i = 0; i < baseSamples.length; i++) {
    const sample = baseSamples[i];
    const isList = sample.includes(",");
    const mutationCount = randomInt(0, 3);

    const mutated = isList
      ? generateWordSetMutation(sample, mutationCount)
      : mutateString(sample, mutationCount);

    pairs.push([sample, mutated]);
  }
  return pairs;
}

export function generateBaseSamples(count: number): string[] {
  const samples: string[] = [];

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const specials = "*+-$@#%^&()_={}[]:;.<>,?/|\\'\"!~";

  function randomChar(from: string): string {
    return from.charAt(Math.floor(Math.random() * from.length));
  }

  function randomString(length: number, charPool: string): string {
    return Array.from({ length }, () => randomChar(charPool)).join("");
  }

  function generateCamelCaseWord(length: number): string {
    let word = "";
    for (let i = 0; i < length; i++) {
      const char = randomChar(alphabet);
      word += Math.random() < 0.5 ? char.toUpperCase() : char;
    }
    return word;
  }

  function generateWordList(): string {
    return generate({ exactly: randomInt(3, 6), join: "," });
  }

  for (let i = 0; i < count; i++) {
    const type = randomInt(1, 6);
    switch (type) {
      case 1: // Alphanumeric
        samples.push(randomString(randomInt(8, 15), alphabet + digits));
        break;
      case 2: // Digits only
        samples.push(randomString(randomInt(8, 20), digits));
        break;
      case 3: // CamelCase Word
        samples.push(generateCamelCaseWord(randomInt(8, 15)));
        break;
      case 4: // Special characters
        samples.push(randomString(randomInt(8, 16), specials));
        break;
      case 5: // Comma-separated words
        samples.push(generateWordList());
        break;
      case 6: // Mixed special-alphanumeric
        samples.push(
          randomString(randomInt(4, 6), specials) +
            randomString(randomInt(4, 6), digits + alphabet) +
            randomString(randomInt(4, 6), specials),
        );
        break;
    }
  }

  return samples;
}
