import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
}

const Select: React.FC<SelectProps> = ({ label, id, options, ...props }) => {
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={selectId} className="mb-1 font-medium">{label}</label>}
      <select id={selectId} className="border px-2 py-1 rounded" {...props}>
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;