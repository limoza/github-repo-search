const GITHUB_API_BASE_URL = 'https://api.github.com';

export const githubFetch = async (
  path: string,
  init?: RequestInit,
): Promise<Response> => {
  const githubToken = process.env.GITHUB_TOKEN;

  const response = await fetch(`${GITHUB_API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      ...(githubToken
        ? {
            Authorization: `Bearer ${githubToken}`,
          }
        : {}),
      ...init?.headers,
    },
  });

  if (!response.ok && response.status >= 500) {
    throw new Error('GitHub API server error.');
  }

  return response;
};
