import type { Milestone } from '@/types';
import { IoIosClose } from 'react-icons/io';

export interface MilestoneItemProps {
  milestone: Milestone;
  minDate?: string;
  maxDate?: string;
  onChange: (field: keyof Omit<Milestone, 'id'>, value: string) => void;
  onRemove: () => void;
}

const MilestoneItem = ({ milestone, minDate, maxDate, onChange, onRemove }: MilestoneItemProps) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3">

      <input
        className="min-w-0 flex-1  py-1 text-sm outline-none placeholder:text-gray-400"
        placeholder="마일스톤명"
        value={milestone.name}
        onChange={e => onChange('name', e.target.value)}
      />
      <input
        type="date"
        className="shrink-0 py-1 text-sm outline-none"
        value={milestone.targetDate}
        min={minDate}
        max={maxDate}
        onChange={e => onChange('targetDate', e.target.value)}
      />
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 cursor-pointer text-gray-400"
      >
        <IoIosClose className="h-5 w-5" />
      </button>
    </div>
  );
};

export default MilestoneItem;
