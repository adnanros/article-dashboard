import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';

// Simplified mock form for test purposes
const TestForm = ({ onSubmit }: { onSubmit: (form: any) => void }) => {
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && author && status) onSubmit({ title, author, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <Select label="Status" options={["Draft", "Published"]} value={status} onChange={(e) => setStatus(e.target.value)} required />
      <Button type="submit">Submit</Button>
    </form>
  );
};

test('form does not submit with empty required fields', () => {
  const handleSubmit = jest.fn();
  render(<TestForm onSubmit={handleSubmit} />);

  fireEvent.click(screen.getByText(/submit/i));

  expect(handleSubmit).not.toHaveBeenCalled();
});

test('form submits when all required fields are filled', () => {
  const handleSubmit = jest.fn();
  render(<TestForm onSubmit={handleSubmit} />);

  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Title' } });
  fireEvent.change(screen.getByLabelText(/author/i), { target: { value: 'Jane Doe' } });
  fireEvent.change(screen.getByLabelText(/status/i), { target: { value: 'Published' } });

  fireEvent.click(screen.getByText(/submit/i));
  expect(handleSubmit).toHaveBeenCalledWith({ title: 'Test Title', author: 'Jane Doe', status: 'Published' });
});
