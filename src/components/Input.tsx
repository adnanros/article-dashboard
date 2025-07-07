import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <input className="border border-gray-300 rounded px-2 py-1" {...props} />
    </div>
  );
};

export default Input;