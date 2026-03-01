import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProjectDraft, WizardStep } from '@/types';
import { PROJECT } from '@/constants';

interface WizardStore {
  draft: ProjectDraft;
  currentStep: WizardStep;

  updateDraft: (partial: Partial<ProjectDraft>) => void;
  setStep: (step: WizardStep) => void;
  isStepValid: (step: WizardStep) => boolean;
  reset: () => void;
}

const initialDraft: ProjectDraft = {
  name: '',
  description: '',
  isPublic: false,
  teamMembers: [],
  techStackIds: [],
  startDate: '',
  endDate: '',
  milestones: [],
};

export const useWizardStore = create<WizardStore>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
      currentStep: 1,

      updateDraft: (partial) =>
        set((state) => ({ draft: { ...state.draft, ...partial } })),

      setStep: (step) => set({ currentStep: step }),

      isStepValid: (step) => {
        const { draft } = get();
        switch (step) {
          case 1:
            return (
              draft.name.length >= PROJECT.NAME.MIN &&
              draft.name.length <= PROJECT.NAME.MAX &&
              (!draft.description || draft.description.length <= PROJECT.DESCRIPTION.MAX)
            );
          case 2:
            return draft.teamMembers.length > 0;
          case 3:
            return draft.techStackIds.length > 0;
          case 4:
            return (
              !!draft.startDate &&
              !!draft.endDate &&
              draft.milestones.every((m) => !!m.name && !!m.targetDate)
            );
          default:
            return true;
        }
      },

      reset: () => set({ draft: initialDraft, currentStep: 1 }),
    }),
    {
      name: 'wizard-draft',
    },
  ),
);
