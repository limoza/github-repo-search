import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SearchForm } from './SearchForm';

const pushMock = vi.fn();
const useSearchParamsMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => useSearchParamsMock(),
}));

describe('SearchForm', () => {
  beforeEach(() => {
    pushMock.mockReset();
    useSearchParamsMock.mockReset();
  });

  it('初回検索時にsort=best-matchを含むURLへ遷移する', () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams(''));

    render(<SearchForm initialQuery="" currentSort="best-match" />);

    fireEvent.change(
      screen.getByRole('searchbox', { name: 'リポジトリ名で検索' }),
      {
        target: { value: 'react' },
      },
    );
    fireEvent.click(screen.getByRole('button', { name: '検索' }));

    expect(pushMock).toHaveBeenCalledWith('/?q=react&page=1&sort=best-match');
  });

  it('現在のsortがstarsならそのまま維持して検索する', () => {
    useSearchParamsMock.mockReturnValue(
      new URLSearchParams('q=react&page=3&sort=stars'),
    );

    render(<SearchForm initialQuery="react" currentSort="stars" />);

    fireEvent.change(
      screen.getByRole('searchbox', { name: 'リポジトリ名で検索' }),
      {
        target: { value: 'nextjs' },
      },
    );
    fireEvent.click(screen.getByRole('button', { name: '検索' }));

    expect(pushMock).toHaveBeenCalledWith('/?q=nextjs&page=1&sort=stars');
  });

  it('入力値が変わっていない場合は遷移しない', () => {
    useSearchParamsMock.mockReturnValue(
      new URLSearchParams('q=react&page=1&sort=best-match'),
    );

    render(<SearchForm initialQuery="react" currentSort="best-match" />);

    fireEvent.click(screen.getByRole('button', { name: '検索' }));

    expect(pushMock).not.toHaveBeenCalled();
  });

  it('前後の空白をtrimして検索する', () => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams(''));

    render(<SearchForm initialQuery="" currentSort="best-match" />);

    fireEvent.change(
      screen.getByRole('searchbox', { name: 'リポジトリ名で検索' }),
      {
        target: { value: '  react  ' },
      },
    );
    fireEvent.click(screen.getByRole('button', { name: '検索' }));

    expect(pushMock).toHaveBeenCalledWith('/?q=react&page=1&sort=best-match');
  });
});
