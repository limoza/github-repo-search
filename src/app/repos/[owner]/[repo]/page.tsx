import { CircleDot, ExternalLink, Eye, GitFork, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { RepositoryStatItem } from '@/components/RepositoryStatItem';
import { getRepositoryDetail } from '@/lib/github';
import { formatRelativeUpdatedAt } from '@/utils/formatRelativeUpdatedAt';

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
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <article className="space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src={repository.owner.avatar_url}
              alt={`${repository.owner.login} のアバター`}
              width={48}
              height={48}
              className="rounded-full"
            />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">
                  {repository.full_name}
                </h1>

                <Link
                  href={repository.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label={`${repository.full_name} を GitHub で開く`}
                >
                  <ExternalLink className="size-5" aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {repository.language ?? '言語情報なし'}
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {repository.description && (
            <p className="text-sm leading-7 text-muted-foreground">
              {repository.description}
            </p>
          )}

          <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <RepositoryStatItem
              icon={<Star className="size-4" aria-hidden="true" />}
              label="Stars"
              value={repository.stargazers_count.toLocaleString()}
            />
            <RepositoryStatItem
              icon={<Eye className="size-4" aria-hidden="true" />}
              label="Watchers"
              value={repository.watchers_count.toLocaleString()}
            />
            <RepositoryStatItem
              icon={<GitFork className="size-4" aria-hidden="true" />}
              label="Forks"
              value={repository.forks_count.toLocaleString()}
            />
            <RepositoryStatItem
              icon={<CircleDot className="size-4" aria-hidden="true" />}
              label="Issues"
              value={repository.open_issues_count.toLocaleString()}
            />
          </dl>

          <dl>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <dt className="text-muted-foreground">更新日時</dt>
              <dd className="text-foreground">
                <time dateTime={repository.updated_at}>
                  {formatRelativeUpdatedAt(repository.updated_at)}
                </time>
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  );
}
