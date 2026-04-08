import { useExerciseResultStore } from "@/store/exerciseResult";

export const createResultId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const saveExerciseResult = <T>(
  exerciseKey: string,
  resultId: string,
  payload: T,
) => {
  useExerciseResultStore.getState().saveResult(exerciseKey, resultId, payload);
};

export const readExerciseResult = <T>(
  exerciseKey: string,
  resultId?: string,
): T | null => {
  return useExerciseResultStore.getState().readResult<T>(exerciseKey, resultId);
};

export const useExerciseResult = <T>(
  exerciseKey: string,
  resultId?: string,
): T | null => {
  return useExerciseResultStore((state) => {
    if (!resultId) return null;
    const payload = state.resultsByExercise[exerciseKey]?.[resultId];
    return (payload as T | undefined) ?? null;
  });
};
