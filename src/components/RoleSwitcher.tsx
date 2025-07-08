import React from 'react';
import { useAuth } from '../context/AuthContext';
import Select from './Select';

const RoleSwitcher: React.FC = () => {
  const { role, setRole } = useAuth();

  return (
    <Select
      label="User Role"
      value={role}
      onChange={(e) => setRole(e.target.value as any)}
      options={["viewer", "editor"]}
    />
  );
};

export default RoleSwitcher;