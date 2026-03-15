import type { GitHubRepository } from '@/types/github';
import { formatNumberWithCommas } from '@/utils/numberFormatter';

type Props = {
  items: GitHubRepository[];
};

export const RepoList = ({ items }: Props) => {
  if (items.length === 0) {
    return <p>該当するリポジトリが見つかりませんでした。</p>;
  }

  return (
    <ul>
      {items.map((repo) => (
        <li key={repo.id}>
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.full_name}
          </a>

          <p>⭐️ {formatNumberWithCommas(repo.stargazers_count)}</p>

          {repo.description && <p>{repo.description}</p>}
        </li>
      ))}
    </ul>
  );
};
