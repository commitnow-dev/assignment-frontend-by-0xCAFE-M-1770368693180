import type { WizardStep } from "@/types";

export const TOTAL_STEPS = 5;

export const WIZARD_STEPS: { step: WizardStep; label: string }[] = [
  { step: 1, label: '기본 정보' },
  { step: 2, label: '팀원' },
  { step: 3, label: '기술 스택' },
  { step: 4, label: '일정' },
  { step: 5, label: '제출' },
];