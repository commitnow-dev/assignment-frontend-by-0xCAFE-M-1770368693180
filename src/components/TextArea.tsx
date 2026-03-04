import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  label?: string;
  errorMessage?: string;
}

const TextArea = ({ label, errorMessage, ...props }: TextAreaProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && <label className="px-1 text-gray-700">{label}</label>}
      <div className="relative w-full">
        <textarea
          className={clsx(
            'w-full border border-gray-300 bg-white rounded-lg px-3 py-2 outline-none resize-none',
            errorMessage ? 'border-red-400 focus:ring-2 focus:ring-red-300' : 'border-gray-300 focus:ring-2 focus:ring-indigo-300',
          )}
          {...props}
        />
        {errorMessage && (
          <p className="absolute left-1 top-full pt-1 text-xs text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
