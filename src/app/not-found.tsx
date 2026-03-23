import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          ページが見つかりませんでした
        </h1>

        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          指定されたページは存在しないか、移動または削除された可能性があります。
        </p>

        <Button asChild className="w-full sm:w-auto">
          <Link href="/">トップページに戻る</Link>
        </Button>
      </div>
    </main>
  );
}
