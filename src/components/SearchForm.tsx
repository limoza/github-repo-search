'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { SubmitEventHandler } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { buildSearchUrl } from '@/lib/buildSearchUrl';

type SearchFormProps = {
  initialQuery: string;
};

export const SearchForm = ({ initialQuery }: SearchFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(initialQuery);

  useEffect(() => {
    setInputValue(initialQuery);
  }, [initialQuery]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const trimmedInputValue = inputValue.trim();
    const trimmedInitialQuery = initialQuery.trim();

    if (trimmedInputValue === trimmedInitialQuery) {
      return;
    }

    const nextUrl = buildSearchUrl({
      currentSearchParams: searchParams.toString(),
      query: trimmedInputValue,
      page: 1,
    });

    router.push(nextUrl);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="GitHubリポジトリ検索"
      className="space-y-2 mt-4"
    >
      <label htmlFor="repo-search-input" className="sr-only">
        リポジトリ名で検索
      </label>

      <div className="flex items-start gap-2">
        <Input
          id="repo-search-input"
          type="search"
          inputMode="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="例: react"
          autoComplete="off"
          className="h-11 text-lg"
        />

        <Button type="submit" className="h-11 min-w-24 font-bold text-base">
          検索
        </Button>
      </div>
    </form>
  );
};
