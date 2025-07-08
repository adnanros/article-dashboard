import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
  const { theme } = useTheme();
  const selectId = props.id || label?.toLowerCase().replace(/\s+/g, '-');
  const baseClass = theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300';

  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={selectId} className="text-sm font-semibold">{label}</label>}
      <select
        id={selectId}
        className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${baseClass}`}
        tabIndex={0}
        aria-label={props['aria-label'] || label}
        {...props}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;