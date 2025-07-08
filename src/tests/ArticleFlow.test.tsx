import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { ArticleProvider } from '../context/ArticleContext';
import { makeServer } from '../services/api';
import Home from '../pages/Home';

let server: any;

beforeEach(() => {
  server = makeServer();
});

afterEach(() => {
  server.shutdown();
});

test('renders articles and filters by search', async () => {
  render(
    <ArticleProvider>
      <Home />
    </ArticleProvider>
  );

  expect(await screen.findByText(/example article/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/search/i), {
    target: { value: 'non-existent title' },
  });

  await waitFor(() => {
    expect(screen.queryByText(/example article/i)).not.toBeInTheDocument();
  });
});