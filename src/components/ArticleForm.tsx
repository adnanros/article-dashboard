import React, { useEffect, useState } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { Article } from '../types';

interface Props {
  initialData: Partial<Article>;
  onSubmit: (data: Partial<Article>) => void;
}

const ArticleForm: React.FC<Props> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Article>>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.status) return;
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Title"
        value={formData.title || ''}
        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        required
      />
      <Input
        label="Author"
        value={formData.author || ''}
        onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
        required
      />
      <Select
        label="Status"
        options={['Draft', 'Published']}
        value={formData.status || ''}
        onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as 'Draft' | 'Published' }))}
        required
      />
      <Button type="submit">{formData.id ? 'Update' : 'Create'}</Button>
    </form>
  );
};

export default ArticleForm;
