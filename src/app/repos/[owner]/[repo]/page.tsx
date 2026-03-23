import { CircleDot, ExternalLink, Eye, GitFork, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { RepositoryStatItem } from '@/components/RepositoryStatItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href={repository.html_url}
        target="_blank"
        rel="noreferrer"
        className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`${repository.full_name} を GitHub で開く`}
      >
        <Card className="transition-shadow group-hover:border-primary group-hover:shadow-md group-active:border-primary group-active:shadow-sm">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={repository.owner.avatar_url}
                alt=""
                width={48}
                height={48}
                className="rounded-full"
              />

              <div className="min-w-0">
                <CardTitle className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  <span className="truncate">{repository.full_name}</span>
                  <ExternalLink
                    className="size-5 shrink-0"
                    aria-hidden="true"
                  />
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {repository.language ?? '言語情報なし'}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {repository.description && (
              <p className="text-sm leading-7 text-muted-foreground">
                {repository.description}
              </p>
            )}
            <dl className="grid grid-cols-2 gap-4 mt-3 lg:grid-cols-4">
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
          </CardContent>
        </Card>
      </Link>
    </main>
  );
}
