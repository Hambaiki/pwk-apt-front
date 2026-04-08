import ExerciseConfigureForm from "@/components/exercise/ExerciseConfigureForm";
import { FormInput } from "@/components/ui/form";
import { defaultConfig } from "../constants";
import { Config } from "../types";

interface ConfigurerFormProps {
  onSubmit: (config: Config) => void;
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
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-neutral-700">
              Number of questions
            </label>
            <FormInput
              type="number"
              min={1}
              max={30}
              value={config.questionCount}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  questionCount: Math.min(
                    30,
                    Math.max(1, Number(e.target.value) || 1),
                  ),
                }))
              }
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-neutral-700">
              Min sequence length
            </label>
            <FormInput
              type="number"
              min={3}
              max={config.maxLength}
              value={config.minLength}
              onChange={(e) => {
                const value = Number(e.target.value) || 3;
                setConfig((prev) => ({
                  ...prev,
                  minLength: Math.min(value, prev.maxLength),
                }));
              }}
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-neutral-700">
              Max sequence length
            </label>
            <FormInput
              type="number"
              min={config.minLength}
              max={10}
              value={config.maxLength}
              onChange={(e) => {
                const value = Number(e.target.value) || 7;
                setConfig((prev) => ({
                  ...prev,
                  maxLength: Math.max(value, prev.minLength),
                }));
              }}
            />
          </div>
        </div>
      )}
    </ExerciseConfigureForm>
  );
}
