import type { ComponentPropsWithoutRef } from 'react';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  isActive?: boolean;
}

const Button = ({ isActive = true, children, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={!isActive}
      className={`flex justify-center items-center whitespace-nowrap rounded-xl px-4 py-2 text-white  ${isActive ? 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
