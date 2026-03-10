import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from 'react';
import { useId } from 'react';
import { CiSearch } from 'react-icons/ci';

export interface SearchBoxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'onSelect'> {
  items?: string[];
  onSelect?: (item: string) => void;
}

const SearchBox = ({ items, onSelect, onFocus, onKeyDown, ...props }: SearchBoxProps) => {
  const listBoxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="relative w-full">
      <div ref={containerRef}>
        <div className="flex w-full rounded-3xl border border-gray-300 gap-3 px-4 py-3 items-center">
          <CiSearch className="w-5 h-5 shrink-0 text-gray-500" />
          <input
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls={isOpen ? listBoxId : undefined}
            className="w-full bg-transparent outline-none"
            onFocus={(e) => {
              setIsOpen(true);
              onFocus?.(e);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsOpen(false);
              onKeyDown?.(e);
            }}
            {...props}
          />
        </div>

        {isOpen && items && items.length > 0 && (
          <ul
            id={listBoxId}
            role="listbox"
            className="absolute z-10 mt-1 w-full rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden"
          >
            {items.map((item) => (
              <li
                key={item}
                role="option"
                tabIndex={0}
                onClick={() => {
                  onSelect?.(item);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect?.(item);
                    setIsOpen(false);
                  } else if (e.key === 'Escape') {
                    setIsOpen(false);
                  }
                }}
                className="flex gap-3 items-center px-4 py-3 cursor-pointer text-gray-700 hover:bg-indigo-50"
              >
                <CiSearch className="w-5 h-5 shrink-0 text-gray-500" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
