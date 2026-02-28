import { useState } from 'react';
import type { Milestone } from '@/types';
import Input from '@/components/Input';
import MilestoneItem from '@/components/MilestoneItem';

export default function ScheduleSetupPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const handleAddMilestone = () => {
    setMilestones((prev) => [...prev, { id: crypto.randomUUID(), name: '', targetDate: '' }]);
  };

  const handleMilestoneChange = (id: string, field: keyof Omit<Milestone, 'id'>, value: string) => {
    setMilestones((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const handleRemoveMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  const resetOutOfRangeMilestones = (newStart: string, newEnd: string) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.targetDate && (m.targetDate < newStart || m.targetDate > newEnd) ? { ...m, targetDate: '' } : m,
      ),
    );
  };

  console.log(milestones)

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
              setStartDate(e.target.value);
              resetOutOfRangeMilestones(e.target.value, endDate);
            }}
          />
          <Input
            label="종료일"
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(e) => {
              setEndDate(e.target.value);
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
          <p className="px-1 text-sm text-gray-400">시작일과 종료일을 선택해주세요</p>
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
