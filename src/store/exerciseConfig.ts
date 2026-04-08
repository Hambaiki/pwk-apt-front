import { defaultConfig as comparisonDefault } from "@/features/comparison/constants";
import { Config as ComparisonConfig } from "@/features/comparison/types";
import { defaultConfig as dualTaskDefault } from "@/features/dual-task-coordination/constants";
import { Config as DualTaskConfig } from "@/features/dual-task-coordination/types";
import { defaultConfig as flightInformationDefault } from "@/features/flight-information/constants";
import { ExerciseConfig as FlightInformationConfig } from "@/features/flight-information/types";
import { defaultConfig as gridMemoryDefault } from "@/features/grid-memory/constants";
import { Config as GridMemoryConfig } from "@/features/grid-memory/types";
import { defaultConfig as readBackMemoryDefault } from "@/features/read-back-memory/constants";
import { Config as ReadBackMemoryConfig } from "@/features/read-back-memory/types";
import { defaultConfig as scanningDefault } from "@/features/scanning/constants";
import { Config as ScanningConfig } from "@/features/scanning/types";
import { defaultConfig as sequenceMemoryDefault } from "@/features/sequence-memory/constants";
import { Config as SequenceMemoryConfig } from "@/features/sequence-memory/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ExerciseConfigState {
  scanning: { config: ScanningConfig; instanceId: number };
  gridMemory: { config: GridMemoryConfig; instanceId: number };
  comparison: { config: ComparisonConfig; instanceId: number };
  dualTask: { config: DualTaskConfig; instanceId: number };
  flightInformation: { config: FlightInformationConfig; instanceId: number };
  sequenceMemory: { config: SequenceMemoryConfig; instanceId: number };
  readBackMemory: { config: ReadBackMemoryConfig; instanceId: number };

  startScanning: (config: ScanningConfig) => void;
  startGridMemory: (config: GridMemoryConfig) => void;
  startComparison: (config: ComparisonConfig) => void;
  startDualTask: (config: DualTaskConfig) => void;
  startFlightInformation: (config: FlightInformationConfig) => void;
  startSequenceMemory: (config: SequenceMemoryConfig) => void;
  startReadBackMemory: (config: ReadBackMemoryConfig) => void;
}

export const useExerciseConfigStore = create<ExerciseConfigState>()(
  persist(
    (set) => ({
      scanning: { config: scanningDefault, instanceId: 0 },
      gridMemory: { config: gridMemoryDefault, instanceId: 0 },
      comparison: { config: comparisonDefault, instanceId: 0 },
      dualTask: { config: dualTaskDefault, instanceId: 0 },
      flightInformation: { config: flightInformationDefault, instanceId: 0 },
      sequenceMemory: { config: sequenceMemoryDefault, instanceId: 0 },
      readBackMemory: { config: readBackMemoryDefault, instanceId: 0 },

      startScanning: (config) =>
        set((state) => ({
          scanning: { config, instanceId: state.scanning.instanceId + 1 },
        })),
      startGridMemory: (config) =>
        set((state) => ({
          gridMemory: {
            config,
            instanceId: state.gridMemory.instanceId + 1,
          },
        })),
      startComparison: (config) =>
        set((state) => ({
          comparison: { config, instanceId: state.comparison.instanceId + 1 },
        })),
      startDualTask: (config) =>
        set((state) => ({
          dualTask: { config, instanceId: state.dualTask.instanceId + 1 },
        })),
      startFlightInformation: (config) =>
        set((state) => ({
          flightInformation: {
            config,
            instanceId: state.flightInformation.instanceId + 1,
          },
        })),
      startSequenceMemory: (config) =>
        set((state) => ({
          sequenceMemory: {
            config,
            instanceId: state.sequenceMemory.instanceId + 1,
          },
        })),
      startReadBackMemory: (config) =>
        set((state) => ({
          readBackMemory: {
            config,
            instanceId: state.readBackMemory.instanceId + 1,
          },
        })),
    }),
    {
      name: "pwk-apt-exercise-config",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
