"use client";

import Score from "@/components/exercise/Score";
import { Card } from "@/components/ui";
import { Choice } from "@/types/exercies";
import { comparisonAnswers } from "../constants";
import { ComparisonItem, GenerationType } from "../types";

interface ComparisonResultProps {
  items: ComparisonItem[];
  answers: Record<number, Choice>;
  correctAnswerCount: number;
}

const ComparisonResult = ({
  items,
  answers,
  correctAnswerCount,
}: ComparisonResultProps) => {
  return (
    <div className="space-y-4">
      <Score
        answerCount={Object.keys(answers).length}
        correctCount={correctAnswerCount}
        totalCount={items.length}
        score={correctAnswerCount}
        maxScore={items.length}
      />

      <Card className="space-y-4 rounded-2xl">
        {items.map((item, index) => {
          const question = item.mutations ? item : undefined;
          const answer: Choice | undefined = answers[index];
          const correct = answer
            ? comparisonAnswers[answer]?.check(question?.mutationCount ?? 0)
            : false;

          return (
            <Card key={index} className="space-y-2 bg-surface">
              <div className="flex">
                <div className="flex-1">
                  <p className="font-bold">Question {index + 1}</p>
                  <p className="text-sm text-muted-foreground">
                    Your answer:{" "}
                    <span className="font-semibold">
                      {answer ?? "<no answer>"}
                    </span>
                  </p>
                  {answer && comparisonAnswers[answer] && (
                    <p className="text-sm text-muted-foreground">
                      {comparisonAnswers[answer].description}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Mutations in total:{" "}
                    <span className="font-semibold">
                      {question?.mutationCount}
                    </span>
                  </p>
                </div>

                <div>
                  {answer ? (
                    correct ? (
                      <span className="inline-flex items-center rounded-full bg-success-100 px-3 py-1 text-sm font-medium text-success-700">
                        Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-danger-100 px-3 py-1 text-sm font-medium text-danger-700">
                        Incorrect
                      </span>
                    )
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700">
                      Not Answered
                    </span>
                  )}
                </div>
              </div>

              <Card variant="info" className="rounded-lg">
                <p className="font-bold">All mutations</p>
                <ul className="list-inside list-disc text-sm">
                  {question?.mutations.map((mutation, i) => {
                    const isWords =
                      item.generationType === GenerationType.WORDS;
                    return (
                      <li key={i}>
                        {mutation.mutationType}{" "}
                        <code>
                          {isWords ? mutation.base.join(", ") : mutation.base}
                        </code>{" "}
                        to{" "}
                        <code>
                          {isWords
                            ? mutation.mutatedBase.join(", ")
                            : mutation.mutatedBase.join(" ")}
                        </code>
                      </li>
                    );
                  })}
                  {question?.mutations.length === 0 && (
                    <li className="italic text-muted-foreground">
                      No mutations (items were identical)
                    </li>
                  )}
                </ul>
              </Card>
            </Card>
          );
        })}
      </Card>
    </div>
  );
};

export default ComparisonResult;
