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
      submitDisabled={(config) =>
        config.letterCount + config.symbolCount + config.numberCount > 25
      }
      className="space-y-6"
    >
      {({ config, setConfig }) => (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4 rounded-xl border border-neutral-200 bg-surface p-4">
              <h4>Timing Settings</h4>
              <div className="space-y-3">
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Memory Time (seconds)
                  <FormInput
                    type="number"
                    value={config.memoryTime}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        memoryTime: parseInt(e.target.value) || 120,
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Input Time (seconds)
                  <FormInput
                    type="number"
                    value={config.timeLimit}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        timeLimit: parseInt(e.target.value) || 300,
                      }))
                    }
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-neutral-200 bg-surface p-4">
              <h4>Content Distribution</h4>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Letters Count
                  <FormInput
                    type="number"
                    max="25"
                    value={config.letterCount}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        letterCount: Math.min(
                          25,
                          parseInt(e.target.value) || 0,
                        ),
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Letter Variations
                  <FormInput
                    type="number"
                    max="20"
                    value={config.letterVariations}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        letterVariations: Math.min(
                          20,
                          parseInt(e.target.value) || 0,
                        ),
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Symbols Count
                  <FormInput
                    type="number"
                    max="25"
                    value={config.symbolCount}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        symbolCount: Math.min(
                          25,
                          parseInt(e.target.value) || 0,
                        ),
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Symbol Variations
                  <FormInput
                    type="number"
                    max="21"
                    value={config.symbolVariations}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        symbolVariations: Math.min(
                          21,
                          parseInt(e.target.value) || 0,
                        ),
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Numbers Count
                  <FormInput
                    type="number"
                    max="25"
                    value={config.numberCount}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        numberCount: Math.min(
                          25,
                          parseInt(e.target.value) || 0,
                        ),
                      }))
                    }
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Number Variations
                  <FormInput
                    type="number"
                    max="20"
                    value={config.numberVariations}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        numberVariations: Math.min(
                          20,
                          parseInt(e.target.value) || 0,
                        ),
                      }))
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </ExerciseConfigureForm>
  );
}
