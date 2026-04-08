import ExerciseConfigureForm from "@/components/exercise/ExerciseConfigureForm";
import { Checkbox } from "@/components/ui";
import { FormInput } from "@/components/ui/form";
import { defaultConfig } from "../constants";
import { Config, GenerationType, MutationType } from "../types";

interface ConfigurerFormProps {
  onSubmit: (configs: Config) => void;
  initialConfig?: Config;
  submitLabel?: string;
}

export default function ConfigurerForm({
  onSubmit,
  initialConfig = defaultConfig,
  submitLabel,
}: ConfigurerFormProps) {
  return (
    <ExerciseConfigureForm<Config>
      initialConfig={initialConfig}
      defaultConfig={defaultConfig}
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      className="space-y-6"
    >
      {({ config, setConfig }) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
            Number of Questions
            <FormInput
              name="count"
              type="number"
              min={1}
              max={20}
              value={config.count}
              onChange={(e) =>
                setConfig({ ...config, count: Number(e.target.value) })
              }
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
            Sequence Length
            <FormInput
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

          <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
            Minimum Mutations
            <FormInput
              name="minMutation"
              type="number"
              min={0}
              value={config.minMutation}
              onChange={(e) =>
                setConfig({ ...config, minMutation: Number(e.target.value) })
              }
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
            Maximum Mutations
            <FormInput
              name="maxMutation"
              type="number"
              min={0}
              value={config.maxMutation}
              onChange={(e) =>
                setConfig({ ...config, maxMutation: Number(e.target.value) })
              }
            />
          </label>

          <div className="flex flex-col gap-1 md:col-span-2">
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

          <div className="flex flex-col gap-1 md:col-span-2">
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

          <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
            Timer (seconds)
            <FormInput
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
      )}
    </ExerciseConfigureForm>
  );
}
