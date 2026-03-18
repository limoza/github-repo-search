import type { SortOption } from '@/features/repository-search/constants';
import {
  QUERY_PARAMS,
  SORT_OPTIONS,
} from '@/features/repository-search/constants';
import type {
  GitHubRepositoryDetail,
  GitHubRepositorySearchResponse,
} from '@/types/github';

const BASE_URL = 'https://api.github.com/search/repositories';

type SearchReposParams = {
  q: string;
  page: number;
  perPage: number;
  sort: SortOption;
};

type GetRepositoryDetailParams = {
  owner: string;
  repo: string;
};

export const searchRepositories = async ({
  q,
  page,
  perPage,
  sort,
}: SearchReposParams): Promise<GitHubRepositorySearchResponse> => {
  const params = new URLSearchParams({
    q,
    page: String(page),
    per_page: String(perPage),
  });

  if (sort !== SORT_OPTIONS.BEST_MATCH) {
    params.set(QUERY_PARAMS.SORT, sort);
  }

  const res = await fetch(`${BASE_URL}?${params.toString()}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch repositories');
  }

  return res.json();
};

export const getRepositoryDetail = async ({
  owner,
  repo,
}: GetRepositoryDetailParams): Promise<GitHubRepositoryDetail | null> => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
      cache: 'no-store',
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch repository detail.');
  }

  return response.json();
};
