import { Clock3, GitFork, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buildRepositoryDetailPath } from '@/lib/buildRepositoryDetailPath';
import type { GitHubRepositorySearchItem } from '@/types/github';
import { formatRelativeUpdatedAt } from '@/utils/formatRelativeUpdatedAt';
import { formatNumberWithCommas } from '@/utils/numberFormatter';

type Props = {
  items: GitHubRepositorySearchItem[];
};

export const RepoList = ({ items }: Props) => (
  <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
    {items.map((repository) => {
      if (repository.owner == null) return null;

      const detailPath = buildRepositoryDetailPath({
        owner: repository.owner.login,
        repo: repository.name,
      });

      return (
        <li key={repository.id}>
          <Link
            href={detailPath}
            className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Card className="flex h-full flex-col border-border transition-colors group-hover:border-primary group-hover:shadow-md group-active:border-primary group-active:shadow-sm">
              <CardHeader className="space-y-3">
                <CardTitle>
                  <div className="flex items-center gap-3">
                    <Image
                      src={repository.owner.avatar_url}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                      {repository.full_name}
                    </span>
                  </div>
                </CardTitle>

                {repository.description && (
                  <CardDescription>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {repository.description}
                    </p>
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="mt-auto">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="size-4" aria-hidden="true" />
                    {formatNumberWithCommas(repository.stargazers_count)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitFork className="size-4" aria-hidden="true" />
                    {formatNumberWithCommas(repository.forks_count)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-4" aria-hidden="true" />
                    {formatRelativeUpdatedAt(repository.updated_at)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </li>
      );
    })}
  </ul>
);
