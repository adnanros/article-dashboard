import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  const { theme } = useTheme();
  const inputId = props.id || label?.toLowerCase().replace(/\s+/g, '-');
  const baseClass = theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300';

  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={inputId} className="text-sm font-semibold">{label}</label>}
      <input
        id={inputId}
        className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${baseClass}`}
        tabIndex={0}
        aria-label={props['aria-label'] || label}
        {...props}
      />
    </div>
  );
};

export default Input;