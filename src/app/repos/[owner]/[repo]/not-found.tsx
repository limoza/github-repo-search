import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <h1>リポジトリが見つかりませんでした</h1>
      <p>指定されたリポジトリは存在しないか、取得できませんでした。</p>
      <p>
        <Link href="/">検索ページに戻る</Link>
      </p>
    </main>
  );
}
