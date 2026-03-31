export type MemberRole = "owner" | "admin" | "member";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface TeamMember {
  userId: string;
  role: MemberRole;
}

export interface TechTag {
  id: string;
  name: string;
  category: string;
}

export interface Milestone {
  id: string;
  name: string;
  targetDate: string; // YYYY-MM-DD
}

export interface ProjectDraft {
  name: string;
  description: string;
  isPublic: boolean;
  teamMembers: TeamMember[];
  techStackIds: string[];
  startDate: string;
  endDate: string;
  milestones: Milestone[];
}

export interface StepValidation {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
}

export interface WizardState {
  currentStep: number; // 1-5
  draft: ProjectDraft;
  validation: StepValidation;
  lastSavedAt?: string;
}
