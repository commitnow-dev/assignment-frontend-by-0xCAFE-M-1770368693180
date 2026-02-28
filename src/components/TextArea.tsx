import type { ComponentPropsWithoutRef } from 'react';

export interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  label?: string;
  errorMessage?: string;
}

const TextArea = ({ label, errorMessage, ...props }: TextAreaProps) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && <label className="font-bold px-1 text-gray-700">{label}</label>}
      <textarea
        className={`w-full border border-gray-300 bg-white rounded-lg px-3 py-2 outline-none resize-none ${errorMessage ? 'border-red-400 focus:ring-2 focus:ring-red-300' : 'border-gray-300 focus:ring-2 focus:ring-indigo-300'}`}
        {...props}
      />
      {errorMessage && <p className="px-1 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default TextArea;
