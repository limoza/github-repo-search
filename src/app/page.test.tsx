import { render, screen } from '@testing-library/react';

import Page from '@/app/page';

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
