import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const { theme } = useTheme();
  const baseClass = theme === 'dark' ? 'bg-gray-700 hover:bg-gray-800 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white';

  return (
    <button
      className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${baseClass}`}
      tabIndex={0}
      aria-label={props['aria-label'] || 'Button'}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;