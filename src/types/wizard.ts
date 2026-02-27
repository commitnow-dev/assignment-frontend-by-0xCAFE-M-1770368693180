import type { ProjectDraft } from './project';

export interface StepValidation {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
}

export interface WizardState {
  currentStep: 1 | 2 | 3 | 4 | 5;
  draft: ProjectDraft;
  validation: StepValidation;
  lastSavedAt?: string;
}
