import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import Page from '@/app/page';

vi.mock('@/lib/github', () => ({
  searchRepositories: vi.fn(() =>
    Promise.resolve({ items: [], total_count: 0 }),
  ),
}));

describe('Home', () => {
  it('renders without crashing', async () => {
    const ui = await Page({
      searchParams: Promise.resolve({
        q: 'test',
        page: '1',
        sort: 'stars',
      }),
    });

    render(ui);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
