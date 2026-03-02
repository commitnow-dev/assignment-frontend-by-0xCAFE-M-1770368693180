import { useNavigate } from 'react-router-dom';
import type { WizardStep } from '@/types';
import { NOTICE } from '@/constants';
import { users, techTags } from '@/data';
import Chip from '@/components/Chip';
import ReviewGroup from '@/components/ReviewGroup';
import { useWizardStore } from '@/store/useWizardStore';

export default function SubmitPage() {
  const navigate = useNavigate();
  const { draft, setStep } = useWizardStore();

  const goToStep = (step: number) => {
    setStep(step as WizardStep);
    navigate(`/wizard/step-${step}`);
  };

  const selectedTags = techTags.filter((t) => draft.techStackIds.includes(t.id));
  const memberUsers = draft.teamMembers.map((m) => ({
    ...m,
    user: users.find((u) => u.id === m.userId),
  }));

  return (
    <div className="flex flex-col w-full gap-4">
      <h2 className="text-lg font-bold text-gray-800">{NOTICE.SUBMIT}</h2>

      <ReviewGroup label="기본 정보" onEdit={() => goToStep(1)}>
        <div className="flex flex-col gap-2 px-1 text-sm text-gray-700">
          <div className="flex gap-2">
            <span className="w-20 shrink-0 text-gray-400">프로젝트명</span>
            <span>{draft.name}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-20 shrink-0 text-gray-400">설명</span>
            <span className="break-all">{draft.description}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-20 shrink-0 text-gray-400">공개 여부</span>
            <span>{draft.isPublic ? '공개' : '비공개'}</span>
          </div>
        </div>
      </ReviewGroup>

      <ReviewGroup label="팀원" onEdit={() => goToStep(2)}>
        <div className="flex flex-col gap-2 px-1 text-sm text-gray-700">
          {memberUsers.map(({ user, role }) => (
            <div key={user?.id} className="flex gap-2">
              <span className="w-20 shrink-0 text-gray-400">{role}</span>
              <span>{user?.name}</span>
            </div>
          ))}
        </div>
      </ReviewGroup>

      <ReviewGroup label="기술 스택" onEdit={() => goToStep(3)}>
        <div className="flex flex-wrap gap-2 px-1">
          {selectedTags.map((tag) => (
            <Chip key={tag.id} isSelected>
              {tag.name}
            </Chip>
          ))}
        </div>
      </ReviewGroup>

      <ReviewGroup label="일정" onEdit={() => goToStep(4)}>
        <div className="flex flex-col gap-2 px-1 text-sm text-gray-700">
          <div className="flex gap-2">
            <span className="w-20 shrink-0 text-gray-400">시작일</span>
            <span>{draft.startDate}</span>
          </div>
          <div className="flex gap-2">
            <span className="w-20 shrink-0 text-gray-400">종료일</span>
            <span>{draft.endDate}</span>
          </div>
          {draft.milestones.length > 0 && (
            <div className="flex gap-2">
              <span className="w-20 shrink-0 text-gray-400">마일스톤</span>
              <div className="flex flex-col gap-1">
                {draft.milestones.map((m) => (
                  <span key={m.id}>
                    {m.name} ({m.targetDate})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </ReviewGroup>
    </div>
  );
}
