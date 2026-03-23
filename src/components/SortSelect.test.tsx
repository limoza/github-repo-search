import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { SORT_SELECT_OPTIONS } from '@/features/repository-search/constants';

import { SortSelect } from './SortSelect';

const pushMock = vi.fn();
const useSearchParamsMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => useSearchParamsMock(),
}));

describe('SortSelect', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
    pushMock.mockReset();
    useSearchParamsMock.mockReset();
  });

  it('best-matchを選択したらsort=best-matchを含むURLへ遷移する', () => {
    useSearchParamsMock.mockReturnValue(
      new URLSearchParams('q=react&page=3&sort=stars'),
    );

    render(<SortSelect currentSort="stars" />);

    fireEvent.click(screen.getByRole('combobox', { name: '並び順' }));
    fireEvent.click(
      screen.getByRole('option', { name: SORT_SELECT_OPTIONS[0].label }),
    );

    expect(pushMock).toHaveBeenCalledWith('/?q=react&page=1&sort=best-match');
  });

  it('別のsortを選択したらpageを1に戻して遷移する', () => {
    useSearchParamsMock.mockReturnValue(
      new URLSearchParams('q=react&page=5&sort=best-match'),
    );

    render(<SortSelect currentSort="best-match" />);

    fireEvent.click(screen.getByRole('combobox', { name: '並び順' }));
    fireEvent.click(
      screen.getByRole('option', { name: SORT_SELECT_OPTIONS[1].label }),
    );

    expect(pushMock).toHaveBeenCalledWith('/?q=react&page=1&sort=stars');
  });
});
