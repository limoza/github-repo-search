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
import { formatDateTime } from '@/utils/dateFormatter';
import { formatNumberWithCommas } from '@/utils/numberFormatter';

type Props = {
  items: GitHubRepositorySearchItem[];
};

export const RepoList = ({ items }: Props) => {
  if (items.length === 0) return;

  return (
    <ul>
      {items.map((repo) => {
        if (repo.owner == null) return null;

        const detailPath = buildRepositoryDetailPath({
          owner: repo.owner.login,
          repo: repo.name,
        });

        return (
          <li key={repo.id}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Link href={detailPath}>{repo.full_name}</Link>
                </CardTitle>
                <CardDescription>
                  ⭐️ {formatNumberWithCommas(repo.stargazers_count)}
                  🔱 {formatNumberWithCommas(repo.forks_count)}
                  🕐 {formatDateTime(repo.updated_at)}
                </CardDescription>
              </CardHeader>

              {repo.description && (
                <CardContent>
                  <p>{repo.description}</p>
                </CardContent>
              )}
            </Card>
          </li>
        );
      })}
    </ul>
  );
};
