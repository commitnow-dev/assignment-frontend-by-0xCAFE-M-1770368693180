import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProjectDraft, WizardStep } from '@/types';
import { BasicInfoSchema, TeamMemberSchema, TechSchema, ScheduleSchema } from '@/schemas/wizard';

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
            return BasicInfoSchema.safeParse(draft).success;
          case 2:
            return TeamMemberSchema.safeParse(draft).success;
          case 3:
            return TechSchema.safeParse(draft).success;
          case 4:
            return ScheduleSchema.safeParse(draft).success;
          default:
            return true;
        }
      },
      reset: () => set({ draft: initialDraft }),
    }),
    {
      name: 'wizard-draft',
      version: 1,
      partialize: (state) => ({ draft: state.draft }),
      migrate: (persistedState, version) => {
        const state = persistedState as { draft?: Partial<ProjectDraft> };
        if (version === 0) {
          return { ...state, draft: { ...state.draft, milestones: state.draft?.milestones ?? [] } };
        }
        return state;
      },
    },
  ),
);
