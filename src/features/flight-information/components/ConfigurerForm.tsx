import ExerciseConfigureForm from "@/components/exercise/ExerciseConfigureForm";
import {
  FormInput,
  FormSelect,
  FormSelectOption,
  FormToggle,
} from "@/components/ui/form";
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
            <div className="flex items-center justify-between gap-4 rounded-lg border border-neutral-100 bg-white px-3 py-2">
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  Enable timed mode
                </p>
                <p className="text-xs text-neutral-500">
                  Adds a per-passage countdown.
                </p>
              </div>
              <FormToggle
                value={config.timed ?? false}
                onChange={(checked) =>
                  setConfig((prev) => ({ ...prev, timed: checked }))
                }
                aria-label="Toggle timed mode"
              />
            </div>

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

            <div className="flex items-center justify-between gap-4 rounded-lg border border-neutral-100 bg-white px-3 py-2">
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  Auto-play passage audio
                </p>
                <p className="text-xs text-neutral-500">
                  Starts narration automatically for each passage.
                </p>
              </div>
              <FormToggle
                value={config.autoPlayAudio ?? false}
                onChange={(checked) =>
                  setConfig((prev) => ({
                    ...prev,
                    autoPlayAudio: checked,
                  }))
                }
                aria-label="Toggle auto-play passage audio"
              />
            </div>
          </div>
        </>
      )}
    </ExerciseConfigureForm>
  );
}
