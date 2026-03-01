import { ERROR, PROJECT } from '@/constants';
import type { ProjectDraft } from '@/types';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export const validateName = (name: string): ValidationResult => {
  if (name.length < PROJECT.NAME.MIN || name.length > PROJECT.NAME.MAX) {
    return { isValid: false, message: ERROR.NAME };
  }
  return { isValid: true, message: '' };
};

export const validateDescription = (description: string): ValidationResult => {
  if (description.length > PROJECT.DESCRIPTION.MAX) {
    return { isValid: false, message: ERROR.DESCRIPTION };
  }
  return { isValid: true, message: '' };
};

export const validateBasicInfo = (draft: ProjectDraft): boolean =>
  validateName(draft.name).isValid && (!draft.description || validateDescription(draft.description).isValid);

export const validateTeamMember = (draft: ProjectDraft): boolean => draft.teamMembers.length > 0;

export const validateTechStack = (draft: ProjectDraft): boolean => draft.techStackIds.length > 0;

export const validateDate = (draft: ProjectDraft): boolean =>
  !!draft.startDate && !!draft.endDate && draft.milestones.every((m) => !!m.name && !!m.targetDate);
