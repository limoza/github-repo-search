type BuildRepositoryDetailPathParams = {
  owner: string;
  repo: string;
};

export const buildRepositoryDetailPath = ({
  owner,
  repo,
}: BuildRepositoryDetailPathParams) => `/repos/${owner}/${repo}`;
