import { Button } from "@/components/ui";

import { cn } from "@/libs/utils/cn";

import {
  CircleQuestionMark,
  Flag,
  LogOut,
  Pause,
  Play,
  RefreshCcw,
} from "lucide-react";

import React, { useEffect, useState } from "react";

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  timerLimit?: number; // in seconds
  isRunning?: boolean;
  isComplete?: boolean;
  onEnd?: () => void;
  onHelp?: () => void;
  onPause?: () => void;
  onRestart?: () => void;
  onExit?: () => void;
}

const Toolbar = ({
  children,
  className,
  timerLimit = 300, // default to 5 minutes
  isRunning,
  isComplete,
  onEnd,
  onHelp,
  onPause,
  onRestart,
  onExit,
}: ToolbarProps) => {
  // Note: Maybe I should separate the timer logic into its own hook/component

  const [timeRemaining, setTimeRemaining] = useState<number>(timerLimit);

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Reset timer if timerLimit changes
  useEffect(() => {
    setTimeRemaining(timerLimit);
  }, [timerLimit]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      // setIsTimerActive(false);
      onEnd?.();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining]);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className={cn("flex flex-wrap items-center justify-between gap-3")}>
        <Button variant="outline" onClick={() => onHelp?.()}>
          <CircleQuestionMark size={16} />
          <span className="ml-2 hidden md:block">How to</span>
        </Button>

        <div className="flex flex-wrap gap-3">
          <div
            className={`flex items-center px-3 py-2 font-bold rounded-lg ${
              timeRemaining < 60
                ? "bg-red-100 text-red-600"
                : "bg-info-100 text-info-600"
            }`}
          >
            Time: {formatTime(timeRemaining)}
          </div>
          {isRunning || !isComplete ? (
            <>
              {onPause && (
                <Button
                  variant={isRunning ? "warning" : "success"}
                  onClick={() => onPause?.()}
                >
                  {isRunning ? <Pause size={16} /> : <Play size={16} />}
                  <span className="ml-2 hidden md:block">
                    {isRunning ? "Pause" : "Resume"}
                  </span>
                </Button>
              )}
              {onEnd && (
                <Button
                  variant="error"
                  disabled={isComplete}
                  onClick={() => onEnd?.()}
                >
                  <Flag size={16} />
                  <span className="ml-2 hidden md:block">End Early</span>
                </Button>
              )}
            </>
          ) : (
            <>
              {onRestart && (
                <Button variant="outline" onClick={() => onRestart?.()}>
                  <RefreshCcw size={16} />
                  <span className="ml-2 hidden md:block">Restart</span>
                </Button>
              )}
              {onExit && (
                <Button variant="outline" onClick={() => onExit?.()}>
                  <LogOut size={16} />
                  <span className="ml-2 hidden md:block">Exit</span>
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Toolbar;
