'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { SubmitEventHandler } from 'react';
import { useState } from 'react';

type Props = {
  initialQuery: string;
};

export const SearchForm = ({ initialQuery }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      params.delete('q');
      params.delete('page');
    } else {
      params.set('q', trimmedQuery);
      params.set('page', '1');
    }

    router.push(`/?${params.toString()}`);
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
