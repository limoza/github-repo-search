import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getRepositoryDetail } from '@/lib/github';

type PageProps = {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
};

export default async function RepositoryDetailPage({ params }: PageProps) {
  const { owner, repo } = await params;
  const repository = await getRepositoryDetail({ owner, repo });

  if (!repository) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1>{repository.full_name}</h1>

      <Image
        src={repository.owner.avatar_url}
        alt={`${repository.owner.login}のアイコン`}
        width={48}
        height={48}
      />

      <p>{repository.language ?? '言語情報なし'}</p>

      <dl>
        <div>
          <dt>Stars</dt>
          <dd>{repository.stargazers_count.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Watchers</dt>
          <dd>{repository.watchers_count.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Forks</dt>
          <dd>{repository.forks_count.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Issues</dt>
          <dd>{repository.open_issues_count.toLocaleString()}</dd>
        </div>
      </dl>
    </main>
  );
}
