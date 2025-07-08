import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={inputId} className="mb-1 font-medium">{label}</label>}
      <input
        id={inputId}
        className="border px-2 py-1 rounded"
        {...props}
      />
    </div>
  );
};

export default Input;