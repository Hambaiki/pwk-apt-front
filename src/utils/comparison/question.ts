import { Answer, ComparisonResult } from "@/types/comparison/question";

/**
 * Computes the Levenshtein distance between two strings.
 */
export function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]); // delete, insert, substitute
      }
    }
  }

  return dp[a.length][b.length];
}

/**
 * Counts the differences between two strings.
 */
export function countDifferences(left: string, right: string): number {
  if (left.includes(",") && right.includes(",")) {
    const leftWords = left.split(",");
    const rightWords = right.split(",");
    const maxLen = Math.max(leftWords.length, rightWords.length);
    let diff = 0;

    for (let i = 0; i < maxLen; i++) {
      const lw = leftWords[i] ?? "";
      const rw = rightWords[i] ?? "";
      if (lw !== rw) diff++;
    }

    return diff;
  } else {
    return levenshtein(left, right);
  }
}

/**
 * Generates a comparison exercise from a list of text pairs.
 */
export function generateComparisonExercise(
  pairs: [string, string][]
): ComparisonResult[] {
  return pairs.map(([left, right]) => {
    const diffCount = countDifferences(left, right);

    let correctAnswer: ComparisonResult["correctAnswer"];
    switch (true) {
      case diffCount === 0:
        correctAnswer = Answer.A;
        break;
      case diffCount === 1:
        correctAnswer = Answer.B;
        break;
      case diffCount === 2:
        correctAnswer = Answer.C;
        break;
      case diffCount === 3:
        correctAnswer = Answer.D;
        break;
      case diffCount === 4:
        correctAnswer = Answer.E;
        break;
      default:
        correctAnswer = Answer.F;
        break;
    }

    return {
      question: `Compare the two texts below:\n${left} vs ${right}\nHow many differences are there?\nA) 0 differences\nB) 1 difference\nC) 2 differences\nD) 3 differences\nE) 4 differences\nF) 5 or more differences`,
      left,
      right,
      differences: diffCount,
      correctAnswer,
    };
  });
}
