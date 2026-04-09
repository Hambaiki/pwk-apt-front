import ExerciseConfigureForm from "@/components/exercise/ExerciseConfigureForm";
import { FormInput, FormToggle } from "@/components/ui/form";
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
            <div className="mt-1 space-y-2 rounded-xl border border-neutral-200 bg-white p-3">
              {Object.values(GenerationType).map((type) => (
                <div
                  key={type}
                  className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-2"
                >
                  <span className="text-sm font-medium text-neutral-700">
                    {type}
                  </span>
                  <FormToggle
                    value={config.generationTypes.includes(type)}
                    onChange={(checked) => {
                      setConfig((prev) => ({
                        ...prev,
                        generationTypes: checked
                          ? [...prev.generationTypes, type]
                          : prev.generationTypes.filter((t) => t !== type),
                      }));
                    }}
                    aria-label={`Toggle ${type} generation type`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            Mutation Types
            <div className="mt-1 space-y-2 rounded-xl border border-neutral-200 bg-white p-3">
              {Object.values(MutationType).map((type) => (
                <div
                  key={type}
                  className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-2"
                >
                  <span className="text-sm font-medium text-neutral-700">
                    {type}
                  </span>
                  <FormToggle
                    value={config.mutationTypes.includes(type)}
                    onChange={(checked) => {
                      setConfig((prev) => ({
                        ...prev,
                        mutationTypes: checked
                          ? [...prev.mutationTypes, type]
                          : prev.mutationTypes.filter((t) => t !== type),
                      }));
                    }}
                    aria-label={`Toggle ${type} mutation type`}
                  />
                </div>
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
