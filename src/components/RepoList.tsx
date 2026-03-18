import Link from 'next/link';

import { buildRepositoryDetailPath } from '@/lib/buildRepositoryDetailPath';
import type { GitHubRepositorySearchItem } from '@/types/github';
import { formatNumberWithCommas } from '@/utils/numberFormatter';

type Props = {
  items: GitHubRepositorySearchItem[];
};

export const RepoList = ({ items }: Props) => {
  if (items.length === 0) {
    return <p>該当するリポジトリが見つかりませんでした。</p>;
  }

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
            <Link href={detailPath}>{repo.full_name}</Link>

            <p>⭐️ {formatNumberWithCommas(repo.stargazers_count)}</p>

            {repo.description && <p>{repo.description}</p>}
          </li>
        );
      })}
    </ul>
  );
};
