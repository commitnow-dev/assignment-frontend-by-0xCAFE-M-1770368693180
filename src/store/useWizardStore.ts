import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProjectDraft, StepValidation, WizardState } from "../types";

interface WizardActions {
  setDraft: (draft: Partial<ProjectDraft>) => void;
  setStepValid: (step: keyof StepValidation, isValid: boolean) => void;
  reset: () => void;
}

const initialDraft: ProjectDraft = {
  name: "",
  description: "",
  isPublic: true,
  teamMembers: [],
  techStackIds: [],
  startDate: "",
  endDate: "",
  milestones: [],
};

const initialValidation: StepValidation = {
  step1: false,
  step2: false,
  step3: false,
  step4: false,
};

export const useWizardStore = create<WizardState & WizardActions>()(
  persist(
    (set) => ({
      currentStep: 1,
      draft: initialDraft,
      validation: initialValidation,

      setDraft: (newDraft) =>
        set((state) => ({
          draft: { ...state.draft, ...newDraft },
          lastSavedAt: new Date().toISOString(),
        })),

      setStepValid: (step, isValid) =>
        set((state) => ({
          validation: { ...state.validation, [step]: isValid },
        })),

      reset: () =>
        set({
          draft: initialDraft,
          validation: initialValidation,
          currentStep: 1,
          lastSavedAt: undefined,
        }),
    }),
    {
      name: "wizard-storage",
      storage: createJSONStorage(() => localStorage), // localStorage에 자동 저장 및 복원
    }
  )
);
