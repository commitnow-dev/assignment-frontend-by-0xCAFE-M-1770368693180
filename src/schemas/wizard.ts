import { z } from 'zod';
import { PROJECT, ERROR, ROLES } from '@/constants';

export const BasicInfoSchema = z.object({
  name: z.string().min(PROJECT.NAME.MIN, ERROR.NAME).max(PROJECT.NAME.MAX, ERROR.NAME),
  description: z.string().max(PROJECT.DESCRIPTION.MAX, ERROR.DESCRIPTION),
  isPublic: z.boolean(),
});

export const TeamMemberSchema = z.object({
  teamMembers: z
    .array(z.object({ userId: z.string(), role: z.enum(ROLES) }))
    .min(PROJECT.TEAM_MEMBER.MIN, ERROR.TEAM_MEMBER),
});

export const TechSchema = z.object({
  techStackIds: z.array(z.string()).min(PROJECT.TECH.MIN, ERROR.TECH),
});

export const ScheduleSchema = z
  .object({
    startDate: z.string().min(1, ERROR.SCHEDULE),
    endDate: z.string().min(1, ERROR.SCHEDULE),
    milestones: z.array(
      z.object({
        id: z.string(),
        name: z.string().min(1, ERROR.MILESTONE_NAME),
        targetDate: z.string().min(1, ERROR.MILESTONE_DATE),
      }),
    ),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (startDate && endDate && startDate >= endDate) {
      ctx.addIssue({ code: 'custom', message: ERROR.START_DATE, path: ['startDate'] });
      ctx.addIssue({ code: 'custom', message: ERROR.END_DATE, path: ['endDate'] });
    }
  });

export type BasicInfoValues = z.infer<typeof BasicInfoSchema>;
export type TeamMemberValues = z.infer<typeof TeamMemberSchema>;
export type TechValues = z.infer<typeof TechSchema>;
export type ScheduleValues = z.infer<typeof ScheduleSchema>;
