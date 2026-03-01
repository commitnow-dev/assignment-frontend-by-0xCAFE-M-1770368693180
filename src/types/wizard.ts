import type { ProjectDraft } from '@/types';

export type WizardStep = 1 | 2 | 3 | 4 | 5;

export interface StepValidation {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
}

export interface WizardState {
  currentStep: WizardStep;
  draft: ProjectDraft;
  validation: StepValidation;
  lastSavedAt?: string;
}
