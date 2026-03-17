'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { SubmitEventHandler } from 'react';
import { useState } from 'react';

import { buildSearchUrl } from '@/lib/buildSearchUrl';

type Props = {
  initialQuery: string;
};

export const SearchForm = ({ initialQuery }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const nextUrl = buildSearchUrl({
      currentSearchParams: searchParams.toString(),
      query,
      page: 1,
    });

    router.push(nextUrl);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="リポジトリ名で検索"
      />
      <button type="submit">検索</button>
    </form>
  );
};
