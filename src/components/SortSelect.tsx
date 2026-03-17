'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { ChangeEventHandler } from 'react';

import {
  SORT_SELECT_OPTIONS,
  SortOption,
} from '@/features/repository-search/constants';

type Props = {
  currentSort: SortOption;
};

export const SortSelect = ({ currentSort }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const nextSort = e.target.value as SortOption;
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', nextSort);
    params.set('page', '1');

    router.push(`/?${params.toString()}`);
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
