"use client";

import ExerciseQuestionRunLayout from "@/components/exercise/ExerciseQuestionRunLayout";
import ExerciseSessionControls from "@/components/exercise/ExerciseSessionControls";
import { Button, Card, Modal, ModalBody, ModalHeader } from "@/components/ui";
import { defaultConfig } from "@/features/dual-task-coordination/constants";
import {
  spellBackwardsQuestions,
  triviaQuestions,
} from "@/features/dual-task-coordination/constants/pool";
import {
  Config,
  DualTaskQuestionHistoryItem,
} from "@/features/dual-task-coordination/types";
import {
  createResultId,
  saveExerciseResult,
} from "@/libs/exercise-result-store";
import { cn } from "@/libs/utils/cn";
import { Hand, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import HowToCard from "./HowToCard";

const baseTempo = 80;
const symbols = ["●", "▲", "■", "◆", "★", "♣", "♠", "♥"];

type RunQuestionStatus = DualTaskQuestionHistoryItem["status"] | "active";

interface RunQuestionItem {
  id: number;
  prompt: string;
  status: RunQuestionStatus;
}

interface DualTaskResultPayload {
  completedQuestions: number;
  totalQuestions: number;
  durationSec: number;
  symbolMode: boolean;
  questionHistory: DualTaskQuestionHistoryItem[];
}

interface DualTaskCoordinationExerciseProps {
  config?: Config;
}

const getQuestionStatusLabel = (status: RunQuestionStatus) => {
  if (status === "active") return "Active";
  if (status === "expired") return "Timed Out";
  return "Session Ended";
};

const getQuestionStatusTone = (status: RunQuestionStatus) => {
  if (status === "active") return "border-info-200 bg-info-50 text-info-700";
  if (status === "expired") {
    return "border-warning-200 bg-warning-50 text-warning-700";
  }
  return "border-neutral-200 bg-neutral-100 text-neutral-700";
};

const DualTaskCoordinationExercise = ({
  config = defaultConfig,
}: DualTaskCoordinationExerciseProps) => {
  const router = useRouter();
  const hasNavigatedToEndRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const questionIdRef = useRef(1);

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isViewingHelp, setIsViewingHelp] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(config.exerciseDuration);
  const [questionsRemaining, setQuestionsRemaining] = useState(
    config.totalQuestions,
  );
  const [questionTimeLeft, setQuestionTimeLeft] = useState(config.questionTime);

  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(
    null,
  );
  const [questionHistory, setQuestionHistory] = useState<
    DualTaskQuestionHistoryItem[]
  >([]);

  const [tempo, setTempo] = useState(baseTempo);
  const [symbolMode, setSymbolMode] = useState(config.symbolMode);
  const [targetSymbols, setTargetSymbols] = useState({ left: "", right: "" });

  const [leftHandPosition, setLeftHandPosition] = useState(0);
  const [rightHandPosition, setRightHandPosition] = useState(0);
  const [leftDirection, setLeftDirection] = useState(1);
  const [rightDirection, setRightDirection] = useState(1);
  const [activeHand, setActiveHand] = useState<"left" | "right">("left");

  const nodeCount = 8;

  useEffect(() => {
    setSymbolMode(config.symbolMode);
    setTimeRemaining(config.exerciseDuration);
    setQuestionsRemaining(config.totalQuestions);
    setQuestionTimeLeft(config.questionTime);
  }, [config]);

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const generateQuestion = useCallback(() => {
    const questionTypes = [
      () => {
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * 20) + 10;
        return `${a} × ${b} = ?`;
      },
      () => {
        const word =
          spellBackwardsQuestions[
            Math.floor(Math.random() * spellBackwardsQuestions.length)
          ];
        return `Spell "${word}" backwards`;
      },
      () => {
        return triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
      },
    ];

    return questionTypes[Math.floor(Math.random() * questionTypes.length)]();
  }, []);

  const playBeep = useCallback((frequency = 800, duration = 100) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }

    const context = audioContextRef.current;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      context.currentTime + duration / 1000,
    );

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration / 1000);
  }, []);

  const moveHands = useCallback(() => {
    if (activeHand === "left") {
      setLeftHandPosition((prev) => {
        const next = prev + leftDirection;
        if (next >= nodeCount - 1) {
          setLeftDirection(-1);
          return nodeCount - 1;
        }
        if (next <= 0) {
          setLeftDirection(1);
          return 0;
        }
        return next;
      });
      playBeep(600, 80);
    } else {
      setRightHandPosition((prev) => {
        const next = prev + rightDirection;
        if (next >= nodeCount - 1) {
          setRightDirection(-1);
          return nodeCount - 1;
        }
        if (next <= 0) {
          setRightDirection(1);
          return 0;
        }
        return next;
      });
      playBeep(800, 80);
    }

    setActiveHand((prev) => (prev === "left" ? "right" : "left"));
  }, [activeHand, leftDirection, rightDirection, playBeep]);

  const spawnNextQuestion = useCallback(() => {
    const prompt = generateQuestion();
    setCurrentQuestion(prompt);
    setCurrentQuestionId(questionIdRef.current);
    questionIdRef.current += 1;
    setQuestionTimeLeft(config.questionTime);
  }, [config.questionTime, generateQuestion]);

  const buildFinalHistory = useCallback(
    (baseHistory: DualTaskQuestionHistoryItem[]): DualTaskQuestionHistoryItem[] => {
      if (!currentQuestion || currentQuestionId === null) {
        return baseHistory;
      }

      return [
        ...baseHistory,
        {
          id: currentQuestionId,
          prompt: currentQuestion,
          status: "ended" as const,
        },
      ];
    },
    [currentQuestion, currentQuestionId],
  );

  const finishExercise = useCallback(
    (
      reason: "completed" | "stopped",
      historyOverride?: DualTaskQuestionHistoryItem[],
    ) => {
      if (hasNavigatedToEndRef.current) return;
      hasNavigatedToEndRef.current = true;

      setIsRunning(false);
      setIsPaused(false);

      const baseHistory = historyOverride ?? questionHistory;
      const finalHistory =
        reason === "stopped" ? buildFinalHistory(baseHistory) : baseHistory;

      const completed = Math.min(config.totalQuestions, finalHistory.length);
      const resultId = createResultId();

      const payload: DualTaskResultPayload = {
        completedQuestions: completed,
        totalQuestions: config.totalQuestions,
        durationSec: config.exerciseDuration,
        symbolMode,
        questionHistory: finalHistory,
      };

      saveExerciseResult("dual-task-coordination", resultId, payload);
      router.push(
        `/dual-task-coordination/end?score=${completed}&total=${config.totalQuestions}&attempted=${completed}&resultId=${resultId}`,
      );
    },
    [
      buildFinalHistory,
      config.exerciseDuration,
      config.totalQuestions,
      questionHistory,
      router,
      symbolMode,
    ],
  );

  const startExercise = () => {
    if (hasStarted && isPaused) {
      setIsRunning(true);
      setIsPaused(false);
      return;
    }

    hasNavigatedToEndRef.current = false;
    questionIdRef.current = 1;

    setHasStarted(true);
    setIsRunning(true);
    setIsPaused(false);

    setTimeRemaining(config.exerciseDuration);
    setQuestionsRemaining(config.totalQuestions);
    setQuestionHistory([]);

    setLeftHandPosition(0);
    setRightHandPosition(0);
    setLeftDirection(1);
    setRightDirection(1);
    setActiveHand("left");

    setTempo(baseTempo);

    if (symbolMode) {
      setTargetSymbols({
        left: symbols[Math.floor(Math.random() * symbols.length)],
        right: symbols[Math.floor(Math.random() * symbols.length)],
      });
    }

    spawnNextQuestion();
  };

  const pauseExercise = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const resetExercise = () => {
    hasNavigatedToEndRef.current = false;
    questionIdRef.current = 1;

    setHasStarted(false);
    setIsRunning(false);
    setIsPaused(false);

    setTimeRemaining(config.exerciseDuration);
    setQuestionsRemaining(config.totalQuestions);
    setQuestionTimeLeft(config.questionTime);

    setCurrentQuestion("");
    setCurrentQuestionId(null);
    setQuestionHistory([]);

    setTempo(baseTempo);
    setLeftHandPosition(0);
    setRightHandPosition(0);
    setLeftDirection(1);
    setRightDirection(1);
    setActiveHand("left");
  };

  const exitExercise = () => {
    router.push("/dual-task-coordination");
  };

  useEffect(() => {
    if (!isRunning || isPaused || !hasStarted) return;

    const interval = window.setInterval(moveHands, 60000 / tempo);
    return () => window.clearInterval(interval);
  }, [hasStarted, isPaused, isRunning, moveHands, tempo]);

  useEffect(() => {
    if (!isRunning || isPaused || !hasStarted) return;

    const interval = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          finishExercise("completed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [finishExercise, hasStarted, isPaused, isRunning]);

  useEffect(() => {
    if (!isRunning || isPaused || !currentQuestion) return;

    const interval = window.setInterval(() => {
      setQuestionTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [currentQuestion, isPaused, isRunning]);

  useEffect(() => {
    if (!isRunning || isPaused || !currentQuestion) return;
    if (questionTimeLeft > 0) return;

    const timedOutQuestion: DualTaskQuestionHistoryItem | null =
      currentQuestion && currentQuestionId !== null
        ? {
            id: currentQuestionId,
            prompt: currentQuestion,
            status: "expired",
          }
        : null;

    const nextHistory = timedOutQuestion
      ? [...questionHistory, timedOutQuestion]
      : questionHistory;

    setQuestionHistory(nextHistory);

    const nextRemaining = questionsRemaining - 1;
    setQuestionsRemaining(Math.max(0, nextRemaining));

    if (nextRemaining <= 0) {
      setCurrentQuestion("");
      setCurrentQuestionId(null);
      finishExercise("completed", nextHistory);
      return;
    }

    spawnNextQuestion();
  }, [
    currentQuestion,
    currentQuestionId,
    finishExercise,
    isPaused,
    isRunning,
    questionHistory,
    questionTimeLeft,
    questionsRemaining,
    spawnNextQuestion,
  ]);

  useEffect(() => {
    if (!currentQuestion) return;
    speak(currentQuestion);
  }, [currentQuestion]);

  useEffect(() => {
    if (!isRunning || !hasStarted) return;

    const tempoChange = window.setInterval(() => {
      const variation = Math.random() * 40 - 20;
      const nextTempo = Math.max(60, Math.min(120, baseTempo + variation));
      setTempo(Math.round(nextTempo));
    }, 10000);

    return () => window.clearInterval(tempoChange);
  }, [hasStarted, isRunning]);

  useEffect(() => {
    if (!symbolMode || !isRunning || !hasStarted) return;

    const symbolChange = window.setInterval(() => {
      setTargetSymbols({
        left: symbols[Math.floor(Math.random() * symbols.length)],
        right: symbols[Math.floor(Math.random() * symbols.length)],
      });
    }, 30000);

    return () => window.clearInterval(symbolChange);
  }, [hasStarted, isRunning, symbolMode]);

  const runQuestions: RunQuestionItem[] = [
    ...questionHistory,
    ...(currentQuestion && currentQuestionId !== null
      ? [
          {
            id: currentQuestionId,
            prompt: currentQuestion,
            status: "active" as const,
          },
        ]
      : []),
  ];

  const reviewVisible = hasStarted && (!isRunning || isPaused);

  const renderHandTrack = (
    label: string,
    position: number,
    isActive: boolean,
    activeColorClass: string,
  ) => {
    return (
      <div className="space-y-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-neutral-700">{label}</p>
          <span
            className={cn(
              "inline-flex rounded-full border px-2 py-1 text-xs font-medium",
              isActive
                ? `${activeColorClass} border-transparent text-white`
                : "border-neutral-200 bg-white text-neutral-600",
            )}
          >
            {isActive ? "Active" : "Standby"}
          </span>
        </div>

        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: nodeCount }).map((_, index) => (
            <div
              key={`${label}-${index}`}
              className={cn(
                "h-3 rounded-full",
                index === position
                  ? activeColorClass
                  : "border border-neutral-200 bg-white",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <Hand size={14} />
          <span>Position: Node {position + 1}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <ExerciseSessionControls
        timeRemaining={timeRemaining}
        isRunning={isRunning}
        onHelp={() => setIsViewingHelp(true)}
        onPause={hasStarted ? (isRunning ? pauseExercise : startExercise) : undefined}
        onEnd={hasStarted ? () => finishExercise("stopped") : undefined}
        onRestart={hasStarted ? resetExercise : undefined}
        onExit={exitExercise}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-emerald-50 p-3 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
              Questions Left
            </p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">
              {questionsRemaining}
            </p>
          </Card>

          <Card className="bg-warning-50 p-3 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-warning-700">
              Question Timer
            </p>
            <p className="mt-1 text-2xl font-bold text-warning-700">
              {questionTimeLeft}s
            </p>
          </Card>

          <Card className="bg-info-50 p-3 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-info-700">
              Tempo
            </p>
            <p className="mt-1 text-2xl font-bold text-info-700">{tempo} BPM</p>
          </Card>

          <Card className="bg-neutral-100 p-3 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-600">
              Mode
            </p>
            <p className="mt-1 text-lg font-semibold text-neutral-800">
              {symbolMode ? "Symbol" : "Standard"}
            </p>
          </Card>
        </div>
      </ExerciseSessionControls>

      {!hasStarted ? (
        <Card className="space-y-4 bg-surface p-6 text-center">
          <h3 className="text-xl font-semibold text-neutral-800">
            Ready to start the dual-task session?
          </h3>
          <p className="text-sm text-neutral-600">
            Start to begin alternating hand cues and timed verbal prompts.
          </p>
          <div>
            <Button onClick={startExercise}>
              <Play size={16} className="mr-2" />
              Start Session
            </Button>
          </div>
        </Card>
      ) : (
        <ExerciseQuestionRunLayout
          panelTitle="Dual Task Session"
          panelMeta={
            <p className="text-xs text-neutral-500">
              Follow active-hand cues and answer prompts verbally before time runs
              out.
            </p>
          }
          navigatorTitle="Prompt History"
          blocked={false}
          navigatorItems={runQuestions.map((item) => ({
            id: String(item.id),
            label: `Q${item.id}`,
            targetId:
              item.status === "active"
                ? `dual-task-question-${item.id}`
                : `dual-task-history-question-${item.id}`,
            isCompleted: item.status !== "active",
            completedLabel: getQuestionStatusLabel(item.status),
            pendingLabel: "Active",
          }))}
        >
          <Card className="space-y-4 border border-neutral-200 bg-white">
            <h3 className="text-lg font-semibold text-neutral-800">
              Hand Coordination
            </h3>

            <div className="grid gap-3 md:grid-cols-2">
              {renderHandTrack(
                "Left Hand",
                leftHandPosition,
                activeHand === "left" && isRunning,
                "bg-blue-500",
              )}
              {renderHandTrack(
                "Right Hand",
                rightHandPosition,
                activeHand === "right" && isRunning,
                "bg-rose-500",
              )}
            </div>

            {symbolMode && (
              <div className="grid gap-3 rounded-xl border border-neutral-200 bg-surface p-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Left Target
                  </p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {targetSymbols.left || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Right Target
                  </p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {targetSymbols.right || "-"}
                  </p>
                </div>
              </div>
            )}
          </Card>

          {currentQuestion && currentQuestionId !== null && (
            <Card
              id={`dual-task-question-${currentQuestionId}`}
              className="space-y-2 border border-neutral-200 bg-warning-50"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-neutral-800">
                  Current Prompt (Q{currentQuestionId})
                </h3>
                <span className="inline-flex rounded-full border border-warning-200 bg-white px-2.5 py-1 text-xs font-medium text-warning-700">
                  {questionTimeLeft}s left
                </span>
              </div>
              <p className="text-base font-medium text-neutral-800">
                {currentQuestion}
              </p>
              <p className="text-xs text-neutral-600">
                Answer verbally while maintaining hand rhythm.
              </p>
            </Card>
          )}

          {reviewVisible && (
            <Card className="space-y-3 border border-neutral-200 bg-surface">
              <h3 className="text-lg font-semibold text-neutral-800">
                Question History Review
              </h3>
              {runQuestions.length === 0 ? (
                <p className="text-sm text-neutral-600">
                  No prompts asked yet in this session.
                </p>
              ) : (
                <div className="space-y-2">
                  {runQuestions.map((item) => (
                    <div
                      key={`review-${item.id}`}
                      id={`dual-task-history-question-${item.id}`}
                      className="rounded-lg border border-neutral-200 bg-white p-3"
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-neutral-800">
                          Q{item.id}
                        </p>
                        <span
                          className={cn(
                            "inline-flex rounded-full border px-2 py-0.5 text-xs font-medium",
                            getQuestionStatusTone(item.status),
                          )}
                        >
                          {getQuestionStatusLabel(item.status)}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-700">{item.prompt}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </ExerciseQuestionRunLayout>
      )}

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

export default DualTaskCoordinationExercise;
