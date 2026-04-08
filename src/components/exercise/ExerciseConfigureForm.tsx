"use client";

import { Button } from "@/components/ui";
import { RefreshCcw, Save } from "lucide-react";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";

interface ExerciseConfigureFormProps<TConfig> {
  initialConfig: TConfig;
  defaultConfig: TConfig;
  onSubmit: (config: TConfig) => void;
  submitLabel?: string;
  submitDisabled?: boolean | ((config: TConfig) => boolean);
  className?: string;
  children: (props: {
    config: TConfig;
    setConfig: Dispatch<SetStateAction<TConfig>>;
  }) => ReactNode;
}

export default function ExerciseConfigureForm<TConfig>({
  initialConfig,
  defaultConfig,
  onSubmit,
  submitLabel,
  submitDisabled,
  className,
  children,
}: ExerciseConfigureFormProps<TConfig>) {
  const [config, setConfig] = useState<TConfig>(initialConfig);
  const isSubmitDisabled =
    typeof submitDisabled === "function"
      ? submitDisabled(config)
      : (submitDisabled ?? false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(config);
  }

  return (
    <form onSubmit={handleSubmit} className={className ?? "space-y-6"}>
      {children({ config, setConfig })}

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setConfig(defaultConfig)}
          icon={<RefreshCcw size={20} />}
        >
          Reset Configuration
        </Button>
        <Button
          type="submit"
          variant="primary"
          icon={<Save size={20} />}
          disabled={isSubmitDisabled}
        >
          {submitLabel || "Save"}
        </Button>
      </div>
    </form>
  );
}
