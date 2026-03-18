import type { Endpoints } from '@octokit/types';

export type GitHubRepositorySearchResponse =
  Endpoints['GET /search/repositories']['response']['data'];

export type GitHubRepositorySearchItem =
  GitHubRepositorySearchResponse['items'][number];

export type GitHubRepositoryDetail =
  Endpoints['GET /repos/{owner}/{repo}']['response']['data'];
