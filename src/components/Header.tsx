import React from 'react';
import Button from './Button';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
      <h1 className="text-xl font-bold">Article Dashboard</h1>
      <Button onClick={toggleTheme} aria-label="Toggle theme">
        Toggle Theme
      </Button>
    </header>
  );
};

export default Header;
