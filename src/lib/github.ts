import type { SortOption } from '@/features/repository-search/constants';
import {
  QUERY_PARAMS,
  SORT_OPTIONS,
} from '@/features/repository-search/constants';
import { githubFetch } from '@/lib/githubClient';
import type {
  GitHubRepositoryDetail,
  GitHubRepositorySearchResponse,
} from '@/types/github';

type SearchRepositoriesParams = {
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
}: SearchRepositoriesParams): Promise<GitHubRepositorySearchResponse> => {
  const params = new URLSearchParams({
    q,
    page: String(page),
    per_page: String(perPage),
  });

  if (sort !== SORT_OPTIONS.BEST_MATCH) {
    params.set(QUERY_PARAMS.SORT, sort);
  }

  const response = await githubFetch(
    `/search/repositories?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  return response.json();
};

export const getRepositoryDetail = async ({
  owner,
  repo,
}: GetRepositoryDetailParams): Promise<GitHubRepositoryDetail | null> => {
  const encodedOwner = encodeURIComponent(owner);
  const encodedRepo = encodeURIComponent(repo);
  const response = await githubFetch(`/repos/${encodedOwner}/${encodedRepo}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch repository detail.');
  }

  return response.json();
};
