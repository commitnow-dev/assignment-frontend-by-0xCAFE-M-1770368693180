import type { Milestone } from '@/types';
import { NOTICE } from '@/constants';
import Input from '@/components/Input';
import MilestoneItem from '@/components/MilestoneItem';
import { useWizardStore } from '@/store/useWizardStore';

export default function ScheduleSetupPage() {
  const { draft, updateDraft } = useWizardStore();
  const { startDate, endDate, milestones } = draft;
  
  const handleAddMilestone = () => {
    updateDraft({ milestones: [...milestones, { id: crypto.randomUUID(), name: '', targetDate: '' }] });
  };

  const handleMilestoneChange = (id: string, field: keyof Omit<Milestone, 'id'>, value: string) => {
    updateDraft({ milestones: milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m)) });
  };

  const handleRemoveMilestone = (id: string) => {
    updateDraft({ milestones: milestones.filter((m) => m.id !== id) });
  };

  const resetOutOfRangeMilestones = (newStart: string, newEnd: string) => {
    updateDraft({
      milestones: milestones.map((m) =>
        m.targetDate && (m.targetDate < newStart || m.targetDate > newEnd) ? { ...m, targetDate: '' } : m,
      ),
    });
  };

  return (
    <div className="flex w-full flex-col gap-7">
      <div className="flex flex-col gap-2">
        <label className="font-bold px-1">프로젝트 기간</label>
        <div className="flex gap-3">
          <Input
            label="시작일"
            type="date"
            value={startDate}
            max={endDate || undefined}
            onChange={(e) => {
              updateDraft({ startDate: e.target.value });
              resetOutOfRangeMilestones(e.target.value, endDate);
            }}
          />
          <Input
            label="종료일"
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(e) => {
              updateDraft({ endDate: e.target.value });
              resetOutOfRangeMilestones(startDate, e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <label className="font-bold">마일스톤</label>
          <button
            type="button"
            onClick={handleAddMilestone}
            disabled={!startDate || !endDate}
            className="text-sm transition disabled:cursor-not-allowed disabled:text-gray-300 enabled:cursor-pointer enabled:text-indigo-500 enabled:hover:text-indigo-700"
          >
            + 추가
          </button>
        </div>

        {!(startDate && endDate) ? (
          <p className="px-1 text-sm text-gray-400">{NOTICE.DATE}</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {milestones.map((milestone) => (
              <li key={milestone.id}>
                <MilestoneItem
                  milestone={milestone}
                  minDate={startDate}
                  maxDate={endDate}
                  onChange={(field, value) => handleMilestoneChange(milestone.id, field, value)}
                  onRemove={() => handleRemoveMilestone(milestone.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
