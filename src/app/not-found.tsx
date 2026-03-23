import Link from 'next/link';

import { AppStatePage } from '@/components/AppStatePage';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <AppStatePage
      title="ページが見つかりませんでした"
      description="指定されたページは存在しないか、移動または削除された可能性があります。"
      actions={
        <Button asChild className="w-full sm:w-auto">
          <Link href="/">トップページに戻る</Link>
        </Button>
      }
    />
  );
}
