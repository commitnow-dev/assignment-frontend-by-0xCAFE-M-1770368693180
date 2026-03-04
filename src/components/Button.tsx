import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isActive?: boolean;
  size?: 'md' | 'lg';
}

const Button = ({ isActive = true, size = 'md', children, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={!isActive}
      className={clsx(
        'flex items-center justify-center whitespace-nowrap rounded-xl px-4 text-white transition',
        size === 'lg' ? 'w-full py-3' : 'py-2',
        isActive ? 'cursor-pointer bg-indigo-500 hover:bg-indigo-600' : 'cursor-not-allowed bg-gray-400',
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
