'use client';

import { useEffect } from 'react';

import { AppErrorState } from '@/components/AppErrorState';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RepositoryErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AppErrorState title="リポジトリの取得に失敗しました。" reset={reset} />
  );
}
