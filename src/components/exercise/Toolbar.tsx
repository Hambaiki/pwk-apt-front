import { Button } from "@/components/ui";

import { cn } from "@/libs/utils";

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
  const [timeRemaining, setTimeRemaining] = useState<number>(timerLimit);

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

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
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <Button variant="outline" onClick={() => onHelp?.()}>
        <CircleQuestionMark size={16} className="mr-2" />
        How to
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
            <Button
              variant={isRunning ? "warning" : "success"}
              onClick={() => onPause?.()}
            >
              {isRunning ? (
                <Pause size={16} className="mr-2" />
              ) : (
                <Play size={16} className="mr-2" />
              )}
              {isRunning ? "Pause" : "Resume"}
            </Button>
            <Button
              variant="error"
              disabled={isComplete}
              onClick={() => onEnd?.()}
            >
              <Flag size={16} className="mr-2" />
              Submit Early
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => onRestart?.()}>
              <RefreshCcw size={16} className="mr-2" />
              Restart
            </Button>
            <Button variant="outline" onClick={() => onExit?.()}>
              <LogOut size={16} className="mr-2" />
              Exit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
