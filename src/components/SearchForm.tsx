'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { buildSearchUrl } from '@/lib/buildSearchUrl';

type Props = {
  initialQuery: string;
};

const SEARCH_DEBOUNCE_MS = 1000;

export const SearchForm = ({ initialQuery }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(initialQuery);

  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const trimmedInputValue = inputValue.trim();
    const trimmedInitialQuery = initialQuery.trim();

    if (trimmedInputValue === trimmedInitialQuery) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const nextUrl = buildSearchUrl({
        currentSearchParams: searchParams.toString(),
        query: trimmedInputValue,
        page: 1,
      });

      router.push(nextUrl);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [inputValue, initialQuery, router, searchParams]);

  return (
    <form role="search">
      <label htmlFor="repo-search-input" className="sr-only">
        リポジトリ名で検索
      </label>

      <input
        id="repo-search-input"
        type="search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="リポジトリ名で検索"
      />
    </form>
  );
};
