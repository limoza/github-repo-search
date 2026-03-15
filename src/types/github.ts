export type GitHubRepository = {
  id: number;
  full_name: string;
  html_url: string;
  stargazers_count: number;
  description: string | null;
};

export type GitHubSearchResponse = {
  total_count: number;
  items: GitHubRepository[];
};
