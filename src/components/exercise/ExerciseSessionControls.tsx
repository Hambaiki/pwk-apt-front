"use client";

import { Button } from "@/components/ui";
import { cn } from "@/libs/utils/cn";
import {
  CircleQuestionMark,
  Flag,
  LogOut,
  Pause,
  Play,
  RefreshCcw,
  Timer,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ExerciseSessionControlsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  timerLimit?: number;
  timeRemaining?: number;
  isRunning?: boolean;
  isComplete?: boolean;
  onEnd?: () => void;
  onHelp?: () => void;
  onPause?: () => void;
  onRestart?: () => void;
  onExit?: () => void;
}

const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const ExerciseSessionControls = ({
  children,
  className,
  timerLimit = 300,
  timeRemaining,
  isRunning = false,
  isComplete = false,
  onEnd,
  onHelp,
  onPause,
  onRestart,
  onExit,
}: ExerciseSessionControlsProps) => {
  const isControlledTimer = typeof timeRemaining === "number";
  const [uncontrolledTimeRemaining, setUncontrolledTimeRemaining] =
    useState<number>(timerLimit);
  const hasTriggeredTimeUpRef = useRef(false);

  const handleRestart = () => {
    if (!isControlledTimer) {
      setUncontrolledTimeRemaining(timerLimit);
      hasTriggeredTimeUpRef.current = false;
    }
    onRestart?.();
  };

  // Uncontrolled mode: countdown locally once per second while running.
  useEffect(() => {
    if (isControlledTimer) return;
    if (!isRunning || uncontrolledTimeRemaining <= 0) return;

    const interval = window.setInterval(() => {
      setUncontrolledTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isControlledTimer, isRunning, uncontrolledTimeRemaining]);

  const displayedTime = isControlledTimer
    ? Math.max(0, timeRemaining)
    : uncontrolledTimeRemaining;

  // Trigger onEnd once when timer reaches 0 in running state.
  useEffect(() => {
    if (displayedTime > 0) {
      hasTriggeredTimeUpRef.current = false;
      return;
    }

    if (!isRunning || hasTriggeredTimeUpRef.current) return;

    hasTriggeredTimeUpRef.current = true;
    onEnd?.();
  }, [displayedTime, isRunning, onEnd]);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="rounded-xl border border-neutral-200 bg-surface p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold",
                displayedTime < 60
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-info-200 bg-info-50 text-info-700",
              )}
            >
              <Timer size={16} />
              <span>{formatTime(displayedTime)}</span>
            </div>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                isRunning
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-neutral-200 bg-neutral-100 text-neutral-700",
              )}
            >
              {isRunning ? "Running" : "Paused"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {onHelp && (
              <Button variant="outline" onClick={onHelp}>
                <CircleQuestionMark size={16} />
                <span className="ml-2 hidden sm:block">How to</span>
              </Button>
            )}

            {onPause && (
              <Button
                variant={isRunning ? "warning" : "success"}
                onClick={onPause}
              >
                {isRunning ? <Pause size={16} /> : <Play size={16} />}
                <span className="ml-2 hidden sm:block">
                  {isRunning ? "Pause" : "Resume"}
                </span>
              </Button>
            )}

            {onEnd && (
              <Button
                variant="destructive"
                disabled={isComplete}
                onClick={onEnd}
              >
                <Flag size={16} />
                <span className="ml-2 hidden sm:block">End</span>
              </Button>
            )}

            {onRestart && (
              <Button variant="outline" onClick={handleRestart}>
                <RefreshCcw size={16} />
                <span className="ml-2 hidden sm:block">Restart</span>
              </Button>
            )}

            {onExit && (
              <Button variant="outline" onClick={onExit}>
                <LogOut size={16} />
                <span className="ml-2 hidden sm:block">Exit</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default ExerciseSessionControls;
