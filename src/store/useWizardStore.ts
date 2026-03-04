import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProjectDraft, WizardStep } from '@/types';
import { validateBasicInfo, validateTeamMember, validateTechStack, validateDate } from '@/utils/validate';

interface WizardStore {
  draft: ProjectDraft;

  updateDraft: (partial: Partial<ProjectDraft>) => void;
  isStepValid: (step: WizardStep) => boolean;
  reset: () => void;
}

const initialDraft: ProjectDraft = {
  name: '',
  description: '',
  isPublic: true,
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

      updateDraft: (partial) => set((state) => ({ draft: { ...state.draft, ...partial } })),
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
      reset: () => set({ draft: initialDraft }),
    }),
    {
      name: 'wizard-draft',
    },
  ),
);
