import type { Milestone } from '@/types';
import { IoIosClose } from 'react-icons/io';

export interface MilestoneItemProps {
  milestone: Milestone;
  minDate?: string;
  maxDate?: string;
  errorMessage?: { name?: string; targetDate?: string };
  onChange: (field: keyof Omit<Milestone, 'id'>, value: string) => void;
  onRemove: () => void;
}

const MilestoneItem = ({ milestone, minDate, maxDate, errorMessage, onChange, onRemove }: MilestoneItemProps) => {
  return (
    <div className="flex flex-col rounded-xl border border-gray-300 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <input
          className="min-w-0 flex-1 py-1 text-sm outline-none placeholder:text-gray-400"
          placeholder="마일스톤명"
          value={milestone.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
        <input
          type="date"
          className="shrink-0 py-1 text-sm outline-none"
          value={milestone.targetDate}
          min={minDate}
          max={maxDate}
          onChange={(e) => onChange('targetDate', e.target.value)}
        />

        <button
          type="button"
          aria-label={`${milestone.name} 삭제`}
          onClick={onRemove}
          className="shrink-0 cursor-pointer text-gray-400"
        >
          <IoIosClose className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <p className="pt-1 text-xs leading-4 text-red-500">{errorMessage?.name ?? errorMessage?.targetDate}</p>
    </div>
  );
};

export default MilestoneItem;
