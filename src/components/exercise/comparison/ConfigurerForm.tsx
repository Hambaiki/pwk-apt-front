import { Button, Card, Checkbox, Input } from "@/components/ui";

import { defaultComparisonOptions } from "@/constants/exercises/comparison";

import {
  ComparisonGeneratorOptions,
  GenerationType,
  MutationType,
} from "@/types/exercises/comparison";

import { useState } from "react";

interface ConfigurerFormProps {
  onSubmit: (configs: ComparisonGeneratorOptions & { timer: number }) => void;
}

export default function ConfigurerForm({ onSubmit }: ConfigurerFormProps) {
  const [configs, setConfigs] = useState<
    ComparisonGeneratorOptions & { timer: number }
  >(defaultComparisonOptions);

  function handleStart(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(configs);
  }

  return (
    <form onSubmit={handleStart}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          Number of Questions
          <Input name="count" type="number" min={1} max={10} defaultValue={5} />
        </label>

        <label className="flex flex-col">
          Sequence Length
          <Input
            name="length"
            type="number"
            min={1}
            max={10}
            value={configs.length}
            onChange={(e) =>
              setConfigs({ ...configs, length: Number(e.target.value) })
            }
          />
        </label>

        <label className="flex flex-col">
          Minimum Mutations
          <Input
            name="minMutation"
            type="number"
            min={0}
            value={configs.minMutation}
            onChange={(e) =>
              setConfigs({ ...configs, minMutation: Number(e.target.value) })
            }
          />
        </label>

        <label className="flex flex-col">
          Maximum Mutations
          <Input
            name="maxMutation"
            type="number"
            min={0}
            value={configs.maxMutation}
            onChange={(e) =>
              setConfigs({ ...configs, maxMutation: Number(e.target.value) })
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
                checked={configs.generationTypes.includes(type)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setConfigs((prev) => ({
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
                checked={configs.mutationTypes.includes(type)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setConfigs((prev) => ({
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
            value={configs.timer}
            onChange={(e) =>
              setConfigs({ ...configs, timer: Number(e.target.value) })
            }
          />
        </label>
      </div>

      {/* Start Button */}
      <div className="flex justify-end gap-4 mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setConfigs(defaultComparisonOptions)}
        >
          Reset
        </Button>
        <Button type="submit" variant="primary">
          Start
        </Button>
      </div>
    </form>
  );
}
