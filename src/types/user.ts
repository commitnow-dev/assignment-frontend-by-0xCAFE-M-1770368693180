export type MemberRole = 'owner' | 'admin' | 'member';

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
