import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SearchResultsSection } from './SearchResultsSection';

const redirectMock = vi.fn();
const searchRepositoriesMock = vi.fn();

vi.mock('next/navigation', () => ({
  redirect: (url: string) => redirectMock(url),
}));

vi.mock('@/lib/github', () => ({
  searchRepositories: (...args: unknown[]) => searchRepositoriesMock(...args),
}));

vi.mock('@/components/RepoList', () => ({
  RepoList: () => <div data-testid="repo-list">RepoList</div>,
}));

vi.mock('@/components/Pagination', () => ({
  Pagination: () => <div data-testid="pagination">Pagination</div>,
}));

describe('SearchResultsSection', () => {
  it('qが空なら検索案内文を表示する', async () => {
    const result = await SearchResultsSection({
      searchState: {
        q: '',
        page: 1,
        sort: 'best-match',
      },
    });

    render(result);

    expect(
      screen.getByText('キーワードを入力して検索してください。'),
    ).toBeInTheDocument();

    expect(searchRepositoriesMock).not.toHaveBeenCalled();
  });

  it('検索結果が0件ならempty stateを表示する', async () => {
    searchRepositoriesMock.mockResolvedValueOnce({
      total_count: 0,
      items: [],
    });

    const result = await SearchResultsSection({
      searchState: {
        q: 'react',
        page: 1,
        sort: 'best-match',
      },
    });

    render(result);

    expect(
      screen.getByText('該当するリポジトリが見つかりませんでした。'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'キーワードを短くする、別の単語にする、表記を変えるなどして再度お試しください。',
      ),
    ).toBeInTheDocument();

    expect(screen.queryByTestId('repo-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('検索結果がある場合は件数表示とRepoListとPaginationを表示する', async () => {
    searchRepositoriesMock.mockResolvedValueOnce({
      total_count: 25,
      items: [
        {
          id: 1,
          name: 'react',
          full_name: 'facebook/react',
          description: 'desc',
          stargazers_count: 1,
          forks_count: 2,
          updated_at: '2026-03-20T12:00:00Z',
          owner: {
            login: 'facebook',
            avatar_url: 'https://example.com/avatar.png',
          },
        },
      ],
    });

    const result = await SearchResultsSection({
      searchState: {
        q: 'react',
        page: 1,
        sort: 'best-match',
      },
    });

    render(result);

    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText(/25件中 1–10件を表示/)).toBeInTheDocument();
    expect(screen.getByTestId('repo-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
