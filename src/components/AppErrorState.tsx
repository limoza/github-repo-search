'use client';

import Link from 'next/link';

import { AppStatePage } from '@/components/AppStatePage';
import { Button } from '@/components/ui/button';

type AppErrorStateProps = {
  title: string;
  reset: () => void;
};

export const AppErrorState = ({ title, reset }: AppErrorStateProps) => {
  return (
    <AppStatePage
      title={title}
      description="一時的な通信障害や予期しない問題が発生しました。時間をおいて再度お試しください。"
      actions={
        <>
          <Button type="button" onClick={reset} className="w-full sm:w-auto">
            再試行
          </Button>

          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/">トップページに戻る</Link>
          </Button>
        </>
      }
    />
  );
};
