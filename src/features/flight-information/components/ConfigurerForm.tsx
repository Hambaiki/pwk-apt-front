import ExerciseConfigureForm from "@/components/exercise/ExerciseConfigureForm";
import { Checkbox } from "@/components/ui";
import { FormInput, FormSelect, FormSelectOption } from "@/components/ui/form";
import { defaultConfig } from "../constants";
import { ExerciseConfig } from "../types";

interface ConfigurerFormProps {
  onSubmit: (config: ExerciseConfig) => void;
  initialConfig?: ExerciseConfig;
  submitLabel?: string;
}

export default function ConfigurerForm({
  onSubmit,
  initialConfig = defaultConfig,
  submitLabel,
}: ConfigurerFormProps) {
  return (
    <ExerciseConfigureForm<ExerciseConfig>
      initialConfig={initialConfig}
      defaultConfig={defaultConfig}
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      className="space-y-6"
    >
      {({ config, setConfig }) => (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Number of passages
              </label>
              <FormInput
                type="number"
                min={1}
                max={20}
                value={config.questionCount}
                onChange={(e) => {
                  const value = Number(e.target.value) || 1;
                  setConfig((prev) => ({
                    ...prev,
                    questionCount: Math.min(20, Math.max(1, value)),
                  }));
                }}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Computation focus
              </label>
              <FormSelect
                value={config.mode}
                onChange={(value) =>
                  setConfig((prev) => ({
                    ...prev,
                    mode: value as ExerciseConfig["mode"],
                  }))
                }
              >
                <FormSelectOption value="mixed">
                  Mixed (arrival and duration)
                </FormSelectOption>
                <FormSelectOption value="arrival">
                  Arrival time focus
                </FormSelectOption>
                <FormSelectOption value="duration">
                  Duration focus
                </FormSelectOption>
              </FormSelect>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-neutral-200 bg-surface p-3">
            <Checkbox
              checked={config.timed ?? false}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, timed: e.target.checked }))
              }
              label="Enable timed mode"
            />

            <div className="flex max-w-xs flex-col space-y-1">
              <label className="text-sm font-medium text-neutral-700">
                Time per passage (seconds)
              </label>
              <FormInput
                type="number"
                min={10}
                max={300}
                value={
                  config.timePerPassageSec ?? defaultConfig.timePerPassageSec!
                }
                disabled={!(config.timed ?? false)}
                onChange={(e) => {
                  const raw = Number(e.target.value) || 10;
                  const clamped = Math.min(300, Math.max(10, raw));
                  setConfig((prev) => ({
                    ...prev,
                    timePerPassageSec: clamped,
                  }));
                }}
              />
            </div>

            <Checkbox
              checked={config.autoPlayAudio ?? false}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  autoPlayAudio: e.target.checked,
                }))
              }
              label="Auto-play passage audio"
            />
          </div>
        </>
      )}
    </ExerciseConfigureForm>
  );
}
