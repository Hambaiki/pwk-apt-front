import ExerciseConfigureForm from "@/components/exercise/ExerciseConfigureForm";
import { FormInput, FormSelect, FormSelectOption } from "@/components/ui/form";
import { defaultConfig, sampleShapes, shapes } from "../constants";
import { Config, QuestionFormat } from "../types";
import ShapeItem from "./ShapeItem";

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
          <div className="space-y-4 rounded-xl border border-neutral-200 bg-surface p-4">
            <h3 className="text-lg font-semibold text-neutral-800">
              Exercise Summary
            </h3>

            <ul className="space-y-2 list-disc list-inside">
              <li>
                Total: <code>{config.itemCount}</code> items/
                <code>{config.questionCount}</code> questions
              </li>
              <li>
                Time limit: <code>{(config.timeLimit / 60).toFixed(1)}</code>{" "}
                minutes
              </li>
              <li>
                Shapes:{" "}
                <code>
                  {config.shapes.length > 0
                    ? config.shapes.map((shape) => shape.name).join(", ")
                    : "All Shapes"}
                </code>
              </li>
              <li>
                Color mode:{" "}
                <code>{config.isMonotoneMode ? "Monotone" : "Color"}</code>
              </li>
              <li>
                Format:{" "}
                <code>
                  {config.questionFormat === QuestionFormat.PerQuestionGrid
                    ? "1 shapes grid per 1 question"
                    : "1 shapes grid to many question"}
                </code>
              </li>
            </ul>

            <p>Preview the shapes and letters used in the exercise.</p>

            <div className="flex flex-wrap gap-1 rounded-xl border border-neutral-200 bg-white p-3">
              {sampleShapes
                .filter((question) => config.shapes.includes(question.shape))
                .map((question, index) => (
                  <ShapeItem
                    key={index}
                    shape={question.shape.name}
                    color={question.color}
                    number={question.number}
                    letter={question.letter}
                    isMonotoneMode={config.isMonotoneMode}
                  />
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-4 rounded-xl border border-neutral-200 bg-surface p-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">
                Question and Timing
              </h4>

              <div>
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Number of Items
                  <FormInput
                    type="number"
                    value={config.itemCount}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        itemCount:
                          parseInt(e.target.value) < prev.questionCount
                            ? prev.questionCount
                            : parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </label>
              </div>

              <div>
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Number of Questions
                  <FormInput
                    type="number"
                    value={config.questionCount}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        questionCount:
                          parseInt(e.target.value) > prev.itemCount
                            ? prev.itemCount
                            : parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </label>
              </div>

              <div>
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Question Format
                  <FormSelect
                    value={config.questionFormat ?? QuestionFormat.SharedGrid}
                    onChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        questionFormat: value as QuestionFormat,
                      }))
                    }
                  >
                    <FormSelectOption value={QuestionFormat.SharedGrid}>
                      1 shapes grid to many question
                    </FormSelectOption>
                    <FormSelectOption value={QuestionFormat.PerQuestionGrid}>
                      1 shapes grid per 1 question
                    </FormSelectOption>
                  </FormSelect>
                </label>
              </div>

              <div>
                <label className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  Time Limit (seconds)
                  <FormInput
                    type="number"
                    value={config.timeLimit}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        timeLimit: parseInt(e.target.value) || 10,
                      }))
                    }
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-neutral-200 bg-surface p-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">
                Visual Mode and Shapes
              </h4>

              <label className="flex flex-col text-sm font-medium text-neutral-700">
                Monotone Mode
                <div className="mt-2 flex items-center">
                  <FormInput
                    type="checkbox"
                    checked={config.isMonotoneMode}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        isMonotoneMode: e.target.checked,
                      }))
                    }
                    className="mr-2 h-4 w-4"
                  />
                  Enable Monotone Mode
                </div>
              </label>

              <div className="flex flex-col text-sm font-medium text-neutral-700">
                Shapes to Include
                <div className="mt-2 flex flex-wrap gap-3">
                  {shapes.map((shape) => (
                    <label className="flex items-center" key={shape.name}>
                      <FormInput
                        type="checkbox"
                        checked={config.shapes.includes(shape)}
                        onChange={(e) => {
                          setConfig((prev) => ({
                            ...prev,
                            shapes: e.target.checked
                              ? [...prev.shapes, shape]
                              : prev.shapes.filter((s) => s !== shape),
                          }));
                        }}
                        className="mr-2 h-4 w-4"
                      />
                      {shape.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </ExerciseConfigureForm>
  );
}
