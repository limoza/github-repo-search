'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SORT_SELECT_OPTIONS,
  type SortOption,
} from '@/features/repository-search/constants';
import { buildSearchUrl } from '@/lib/buildSearchUrl';

type Props = {
  currentSort: SortOption;
};

export const SortSelect = ({ currentSort }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (nextSort: string) => {
    const nextUrl = buildSearchUrl({
      currentSearchParams: searchParams.toString(),
      sort: nextSort as SortOption,
      page: 1,
    });

    router.push(nextUrl);
  };

  return (
    <div>
      <label htmlFor="sort-select">並び順</label>
      <Select value={currentSort} onValueChange={handleValueChange}>
        <SelectTrigger id="sort-select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_SELECT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
