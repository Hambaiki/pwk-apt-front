import { Button, Input } from "@/components/ui";
import { Play, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { defaultConfig } from "../constants";
import { Config } from "../types";

interface ConfigurerFormProps {
  onSubmit: (config: Config) => void;
}

export default function ConfigurerForm({ onSubmit }: ConfigurerFormProps) {
  const [config, setConfig] = useState<Config>(defaultConfig);

  function handleStart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const uniqueKey = Math.random().toString(36).substring(2, 10);
    onSubmit({ ...config, key: uniqueKey });
  }

  return (
    <form onSubmit={handleStart}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex flex-col">
            Exercise Duration (seconds)
            <Input
              type="number"
              value={config.exerciseDuration}
              onChange={(e) =>
                setConfig({
                  ...config,
                  exerciseDuration: Number(e.target.value),
                })
              }
              min="60"
              max="1800"
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Total time allocated for the exercise. (The exercise may end earlier
            if the question limit is reached)
          </p>
        </div>
        <div>
          <label className="flex flex-col">
            Total Questions
            <Input
              type="number"
              value={config.totalQuestions}
              onChange={(e) =>
                setConfig({
                  ...config,
                  totalQuestions: Number(e.target.value),
                })
              }
              min="5"
              max="100"
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Number of questions to be answered during the exercise. (The
            exercise may end earlier if the time limit is reached)
          </p>
        </div>
        <div>
          <label className="flex flex-col">
            Question Time Limit (seconds)
            <Input
              type="number"
              value={config.questionTime}
              onChange={(e) =>
                setConfig({ ...config, questionTime: Number(e.target.value) })
              }
              min="5"
              max="60"
            />
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Time limit for each question.
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <label className="flex items-center">
          <Input
            type="checkbox"
            checked={config.symbolMode}
            onChange={(e) =>
              setConfig({ ...config, symbolMode: e.target.checked })
            }
            className="mr-2"
          />
          Symbol Target Mode
        </label>
        <p className="text-xs text-gray-500 mt-1">
          When enabled, the exercise will focus on symbol recognition and
          coordination.
        </p>
      </div>

      {/* Start Button */}
      <div className="flex justify-end gap-4 mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setConfig(defaultConfig)}
        >
          <RefreshCcw size={20} className="mr-2" />
          Reset Configuration
        </Button>
        <Button type="submit" variant="primary">
          <Play size={20} className="mr-2" />
          Start Exercise ({(config.exerciseDuration / 60).toFixed(1)} minutes)
        </Button>
      </div>
    </form>
  );
}
