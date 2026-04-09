import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ExerciseResultState {
  resultsByExercise: Record<string, Record<string, unknown>>;
  saveResult: <T>(exerciseKey: string, resultId: string, payload: T) => void;
  readResult: <T>(exerciseKey: string, resultId?: string) => T | null;
  clearResult: (exerciseKey: string, resultId: string) => void;
  clearExerciseResults: (exerciseKey: string) => void;
}

export const useExerciseResultStore = create<ExerciseResultState>()(
  persist(
    (set, get) => ({
      resultsByExercise: {},

      saveResult: (exerciseKey, resultId, payload) => {
        set((state) => ({
          resultsByExercise: {
            ...state.resultsByExercise,
            [exerciseKey]: {
              ...(state.resultsByExercise[exerciseKey] ?? {}),
              [resultId]: payload,
            },
          },
        }));
      },

      readResult: (exerciseKey, resultId) => {
        if (!resultId) return null;
        const exerciseResults = get().resultsByExercise[exerciseKey];
        if (!exerciseResults) return null;

        const payload = exerciseResults[resultId];
        return (payload as never) ?? null;
      },

      clearResult: (exerciseKey, resultId) => {
        set((state) => {
          const exerciseResults = state.resultsByExercise[exerciseKey];
          if (!exerciseResults || !(resultId in exerciseResults)) return state;

          const { [resultId]: _removed, ...rest } = exerciseResults;

          if (Object.keys(rest).length === 0) {
            const { [exerciseKey]: _exerciseRemoved, ...remainingExercises } =
              state.resultsByExercise;

            return {
              resultsByExercise: remainingExercises,
            };
          }

          return {
            resultsByExercise: {
              ...state.resultsByExercise,
              [exerciseKey]: rest,
            },
          };
        });
      },

      clearExerciseResults: (exerciseKey) => {
        set((state) => {
          if (!(exerciseKey in state.resultsByExercise)) return state;

          const { [exerciseKey]: _removed, ...remainingExercises } =
            state.resultsByExercise;

          return {
            resultsByExercise: remainingExercises,
          };
        });
      },
    }),
    {
      name: "pwk-apt-exercise-result",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ resultsByExercise: state.resultsByExercise }),
    },
  ),
);
