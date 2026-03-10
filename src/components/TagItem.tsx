import type { TechTag } from '@/types';
import { IoIosClose } from 'react-icons/io';

export interface TagItemProps {
  tag: TechTag;
  onRemove: () => void;
}

const TagItem = ({ tag, onRemove }: TagItemProps) => {
  return (
    <span
      key={tag.id}
      className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700"
    >
      {tag.name}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`${tag.name} 태그 제거`}
        className="cursor-pointer text-indigo-400 hover:text-indigo-600 transition"
      >
        <IoIosClose className="w-4 h-4" aria-hidden="true" />
      </button>
    </span>
  );
};

export default TagItem;
