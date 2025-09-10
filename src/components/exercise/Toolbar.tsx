import { Button, Card } from "@/components/ui";
import { cn } from "@/libs/utils";

import { CircleQuestionMark, Flag, Pause, Play } from "lucide-react";

import React, { useEffect, useState } from "react";

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  timerLimit?: number; // in seconds
  isRunning?: boolean;
  isComplete?: boolean;
  onEnd?: () => void;
  onHelp?: () => void;
  onPause?: () => void;
}

const Toolbar = ({
  className,
  timerLimit = 300, // default to 5 minutes
  isRunning,
  isComplete,
  onEnd,
  onHelp,
  onPause,
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
    <div className={cn("flex items-center justify-between", className)}>
      <Button variant="outline" onClick={() => onHelp?.()}>
        <CircleQuestionMark size={16} className="mr-2" />
        How to
      </Button>

      <div className="flex gap-3">
        <div
          className={`flex items-center px-3 py-2 font-bold rounded-lg ${
            timeRemaining < 60
              ? "bg-red-100 text-red-600"
              : "bg-info-100 text-info-600"
          }`}
        >
          Time: {formatTime(timeRemaining)}
        </div>
        <Button variant="warning" onClick={() => onPause?.()}>
          {isRunning ? (
            <Pause size={16} className="mr-2" />
          ) : (
            <Play size={16} className="mr-2" />
          )}
          {isRunning ? "Pause" : "Resume"}
        </Button>
        <Button variant="error" disabled={!isRunning} onClick={() => onEnd?.()}>
          <Flag size={16} className="mr-2" />
          Submit Early
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
