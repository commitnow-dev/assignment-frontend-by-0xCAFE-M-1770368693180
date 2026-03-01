import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProjectDraft, WizardStep } from '@/types';
import { validateBasicInfo, validateTeamMember, validateTechStack, validateDate } from '@/utils/validate';

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

      updateDraft: (partial) => set((state) => ({ draft: { ...state.draft, ...partial } })),

      setStep: (step) => set({ currentStep: step }),

      isStepValid: (step) => {
        const { draft } = get();
        switch (step) {
          case 1:
            return validateBasicInfo(draft);
          case 2:
            return validateTeamMember(draft);
          case 3:
            return validateTechStack(draft);
          case 4:
            return validateDate(draft);
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
