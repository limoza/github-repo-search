const BASE_URL = 'https://api.github.com/search/repositories';

type SearchReposParams = {
  q: string;
  page: number;
  perPage: number;
  sort: 'best-match' | 'stars';
};

export async function searchRepositories({
  q,
  page,
  perPage,
  sort,
}: SearchReposParams) {
  const params = new URLSearchParams({
    q,
    page: String(page),
    per_page: String(perPage),
  });

  if (sort === 'stars') {
    params.set('sort', 'stars');
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
}
