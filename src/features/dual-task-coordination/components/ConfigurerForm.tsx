import ExerciseConfigureForm from "@/components/exercise/ExerciseConfigureForm";
import { FormInput, FormToggle } from "@/components/ui/form";
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                Exercise Duration (seconds)
                <FormInput
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
              <p className="mt-1 text-xs text-neutral-500">
                Total time allocated for the exercise. (The exercise may end
                earlier if the question limit is reached)
              </p>
            </div>
            <div>
              <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                Total Questions
                <FormInput
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
              <p className="mt-1 text-xs text-neutral-500">
                Number of questions to be answered during the exercise. (The
                exercise may end earlier if the time limit is reached)
              </p>
            </div>
            <div>
              <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                Question Time Limit (seconds)
                <FormInput
                  type="number"
                  value={config.questionTime}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      questionTime: Number(e.target.value),
                    })
                  }
                  min="5"
                  max="60"
                />
              </label>
              <p className="mt-1 text-xs text-neutral-500">
                Time limit for each question.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-neutral-200 bg-surface p-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-700">
                  Symbol Target Mode
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  When enabled, the exercise will focus on symbol recognition
                  and coordination.
                </p>
              </div>
              <FormToggle
                value={config.symbolMode}
                onChange={(checked) =>
                  setConfig({ ...config, symbolMode: checked })
                }
                aria-label="Toggle symbol target mode"
              />
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Tip: enable this for more visual tracking pressure.
            </p>
          </div>
        </>
      )}
    </ExerciseConfigureForm>
  );
}
