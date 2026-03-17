'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { ChangeEventHandler } from 'react';

import {
  SORT_SELECT_OPTIONS,
  SortOption,
} from '@/features/repository-search/constants';
import { buildSearchUrl } from '@/lib/buildSearchUrl';

type Props = {
  currentSort: SortOption;
};

export const SortSelect = ({ currentSort }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const nextSort = e.target.value as SortOption;

    const nextUrl = buildSearchUrl({
      currentSearchParams: searchParams.toString(),
      sort: nextSort,
      page: 1,
    });

    router.push(nextUrl);
  };

  return (
    <label>
      並び順
      <select value={currentSort} onChange={handleChange}>
        {SORT_SELECT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
