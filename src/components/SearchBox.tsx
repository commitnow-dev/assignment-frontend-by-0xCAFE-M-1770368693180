import type { ComponentPropsWithoutRef } from 'react';
import { CiSearch } from 'react-icons/ci';

export interface SearchBoxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onSelect'> {
  items?: string[];
  onSelect?: (item: string) => void;
}

const SearchBox = ({ items, onSelect, ...props }: SearchBoxProps) => {
  return (
    <div className="flex flex-col w-full rounded-3xl border border-gray-300 overflow-hidden">
      <div className="flex gap-3 px-4 py-3 items-center">
        <CiSearch className="w-5 h-5 shrink-0 text-gray-500" />
        <input className="w-full bg-transparent outline-none" {...props} />
      </div>

      {items && items.length > 0 && (
        <ul className="w-full">
          {items.map((item, i) => (
            <li key={i} onClick={() => onSelect?.(item)} className="flex gap-3 items-center px-4 py-3 cursor-pointer text-gray-700 hover:bg-indigo-50">
              <CiSearch className="w-5 h-5 shrink-0 text-gray-500" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
