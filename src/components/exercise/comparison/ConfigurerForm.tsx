import { Button, Checkbox, Input } from "@/components/ui";

import { defaultConfig } from "@/constants/exercises/comparison";

import {
  Config,
  GenerationType,
  MutationType,
} from "@/types/exercises/comparison";

import { RefreshCcw, Play } from "lucide-react";

import { useState } from "react";

interface ConfigurerFormProps {
  onSubmit: (configs: Config) => void;
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
        <label className="flex flex-col">
          Number of Questions
          <Input
            name="count"
            type="number"
            min={1}
            max={10}
            value={config.count}
            onChange={(e) =>
              setConfig({ ...config, count: Number(e.target.value) })
            }
          />
        </label>

        <label className="flex flex-col">
          Sequence Length
          <Input
            name="length"
            type="number"
            min={1}
            max={10}
            value={config.length}
            onChange={(e) =>
              setConfig({ ...config, length: Number(e.target.value) })
            }
          />
        </label>

        <label className="flex flex-col">
          Minimum Mutations
          <Input
            name="minMutation"
            type="number"
            min={0}
            value={config.minMutation}
            onChange={(e) =>
              setConfig({ ...config, minMutation: Number(e.target.value) })
            }
          />
        </label>

        <label className="flex flex-col">
          Maximum Mutations
          <Input
            name="maxMutation"
            type="number"
            min={0}
            value={config.maxMutation}
            onChange={(e) =>
              setConfig({ ...config, maxMutation: Number(e.target.value) })
            }
          />
        </label>

        <div className="flex flex-col md:col-span-2">
          Generation Types
          <div className="flex flex-wrap gap-2 mt-1">
            {Object.values(GenerationType).map((type) => (
              <Checkbox
                key={type}
                name="generationTypes"
                value={type}
                label={type}
                checked={config.generationTypes.includes(type)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setConfig((prev) => ({
                    ...prev,
                    generationTypes: isChecked
                      ? [...prev.generationTypes, type]
                      : prev.generationTypes.filter((t) => t !== type),
                  }));
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col md:col-span-2">
          Mutation Types
          <div className="flex flex-wrap gap-2 mt-1">
            {Object.values(MutationType).map((type) => (
              <Checkbox
                key={type}
                name="mutationTypes"
                value={type}
                label={type}
                checked={config.mutationTypes.includes(type)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setConfig((prev) => ({
                    ...prev,
                    mutationTypes: isChecked
                      ? [...prev.mutationTypes, type]
                      : prev.mutationTypes.filter((t) => t !== type),
                  }));
                }}
              />
            ))}
          </div>
        </div>

        <label className="flex flex-col">
          Timer (seconds)
          <Input
            name="timer"
            type="number"
            min={10}
            max={10_000}
            value={config.timer}
            onChange={(e) =>
              setConfig({ ...config, timer: Number(e.target.value) })
            }
          />
        </label>
      </div>

      {/* Start Button */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="secondary" onClick={() => setConfig(defaultConfig)}>
          <RefreshCcw size={20} className="mr-2" />
          Reset Configuration
        </Button>
        <Button type="submit" variant="primary">
          <Play size={20} className="mr-2" />
          Start Exercise ({(config.timer / 60).toFixed(1)} minutes)
        </Button>
      </div>
    </form>
  );
}
