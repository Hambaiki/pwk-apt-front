"use client";

import ExerciseSessionControls from "@/components/exercise/ExerciseSessionControls";
import ExerciseQuestionRunLayout from "@/components/exercise/ExerciseQuestionRunLayout";
import { Button, Card, Modal, ModalBody, ModalHeader } from "@/components/ui";
import {
  createResultId,
  saveExerciseResult,
} from "@/libs/exercise-result-store";
import { cn } from "@/libs/utils/cn";
import { Choice } from "@/types/exercies";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { comparisonAnswers, defaultConfig } from "../constants";
import { ComparisonItem, Config } from "../types";
import { ComparisonExerciseCard } from "./ComparisonExerciseCard";
import HowToCard from "./HowToCard";

interface ComparisonExerciseProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ComparisonItem[];
  config?: Config;
}

const ComparisonExercise = ({
  items,
  config = defaultConfig,
  className,
  ...props
}: ComparisonExerciseProps) => {
  const router = useRouter();

  const [isViewingHelp, setIsViewingHelp] = useState<boolean>(false);

  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  const [answers, setAnswers] = useState<Record<number, Choice>>({});

  const countCorrectAnswer = () => {
    let correct = 0;
    items.forEach((item, index) => {
      const userAnswer = answers[index];
      if (
        userAnswer &&
        comparisonAnswers[userAnswer]?.check(item.mutationCount)
      ) {
        correct += 1;
      }
    });
    return correct;
  };

  const endExercise = () => {
    const correct = countCorrectAnswer();
    const attempted = Object.keys(answers).length;
    const resultId = createResultId();
    saveExerciseResult("comparison", resultId, {
      items,
      answers,
      correctAnswerCount: correct,
    });
    router.push(
      `/comparison/end?score=${correct}&total=${items.length}&attempted=${attempted}&resultId=${resultId}`,
    );
  };

  const resetExercise = () => {
    setAnswers({});
    setIsTimerActive(true);
  };

  const exitExercise = () => {
    router.push("/comparison");
  };

  return (
    <div {...props} className={cn("flex flex-col gap-y-4", className)}>
      <ExerciseQuestionRunLayout
        controls={
          <ExerciseSessionControls
            isRunning={isTimerActive}
            isComplete={false}
            timerLimit={config.timer}
            onEnd={endExercise}
            onPause={() => setIsTimerActive((prev) => !prev)}
            onHelp={() => setIsViewingHelp(true)}
            onRestart={resetExercise}
            onExit={exitExercise}
          />
        }
        panelTitle="Comparison Exercise"
        navigatorTitle="Question Navigator"
        blocked={!isTimerActive}
        navigatorItems={items.map((_, index) => ({
          id: String(index),
          label: `Q${index + 1}`,
          targetId: `comparison-question-${index + 1}`,
          isCompleted: Boolean(answers[index]),
          completedLabel: "Answered",
          pendingLabel: "Pending",
        }))}
        footer={<Button onClick={endExercise}>Submit All Answers</Button>}
      >
        {items.map((item, index) => (
          <div key={index} id={`comparison-question-${index + 1}`}>
            <ComparisonExerciseCard
              questionNumber={index + 1}
              exercise={item}
              selected={answers[index]}
              onAnswer={(choice) => {
                setAnswers((prev) => ({ ...prev, [index]: choice }));
              }}
            />
          </div>
        ))}
      </ExerciseQuestionRunLayout>

      <Modal
        open={isViewingHelp}
        onClose={() => setIsViewingHelp(false)}
        size="2xl"
        scrollable
      >
        <ModalHeader
          title="How to Complete the Exercise"
          onClose={() => setIsViewingHelp(false)}
        />
        <ModalBody>
          <HowToCard />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ComparisonExercise;
