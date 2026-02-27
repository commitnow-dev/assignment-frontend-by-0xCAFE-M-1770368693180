import type { TeamMember } from './user';

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
