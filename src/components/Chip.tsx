import type { ComponentPropsWithoutRef } from 'react';

export interface ChipProps extends ComponentPropsWithoutRef<'button'> {
  isSelected?: boolean;
}

const Chip = ({ isSelected, children, ...props }: ChipProps) => {
  return (
    <button
      className={`rounded-full px-3 py-1 text-sm transition cursor-pointer ${
        isSelected
          ? 'bg-indigo-500 text-white'
          : 'border border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-500'
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Chip;
