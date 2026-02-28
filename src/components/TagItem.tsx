import type { TechTag } from '@/types';
import { IoIosClose } from 'react-icons/io';

export interface TagItemProps {
  tag: TechTag;
  onRemove: () => void;
}

const TagItem = ({ tag, onRemove }: TagItemProps) => {
  return (
    <span key={tag.id} className="flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
      {tag.name}
      <button
        type="button"
        onClick={onRemove}
        className="cursor-pointer text-indigo-400 hover:text-indigo-600 transition"
      >
        <IoIosClose className="w-4 h-4" />
      </button>
    </span>
  );
};

export default TagItem;
