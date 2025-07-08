import React from 'react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

interface Props {
  onClick: () => void;
}

const AddArticleButton: React.FC<Props> = ({ onClick }) => {
  const { role } = useAuth();

  if (role !== 'editor') return null;

  return <Button onClick={onClick}>Add Article</Button>;
};

export default AddArticleButton;