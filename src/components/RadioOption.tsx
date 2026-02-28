import type React from 'react';

export interface RadioOptionProps {
  name: string;
  value: string;
  checked: boolean;
  onChange?: (value: string) => void;
  children: React.ReactNode;
}

const RadioOption = ({ name, value, checked, onChange, children }: RadioOptionProps) => {
  return (
    <div className="relative flex w-full items-center justify-center bg-gray-50 px-4 py-3">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange?.(value)}
        className="peer hidden"
        id={value}
      />
      <label
        htmlFor={value}
        className="peer-checked:border-indigo-600 absolute top-0 h-full w-full cursor-pointer rounded-full border border-gray-500 transition"
      />
      <div className="peer-checked:border-transparent peer-checked:bg-indigo-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-indigo-600 ring-offset-2 transition" />
      <span>{children}</span>
    </div>
  );
};

export default RadioOption;
