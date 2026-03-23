'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

type AppErrorStateProps = {
  title: string;
  reset: () => void;
};

export const AppErrorState = ({ title, reset }: AppErrorStateProps) => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            一時的な通信障害や予期しない問題が発生しました。時間をおいて再度お試しください。
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" onClick={reset} className="w-full sm:w-auto">
            再試行
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleGoHome}
          >
            <Link href="/">トップページに戻る</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};
