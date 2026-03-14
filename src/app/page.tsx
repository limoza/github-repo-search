type RawSearchParams = {
  q?: string;
  page?: string;
  sort?: string;
};

type SearchParams = Promise<RawSearchParams>;

type SearchState = {
  q: string;
  page: number;
  sort: 'best-match' | 'stars';
};

type PageProps = {
  searchParams: SearchParams;
};

function normalizeSearchParams(params: RawSearchParams): SearchState {
  const q = params.q?.trim() ?? '';

  const rawPage = Number(params.page ?? '1');
  const page = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const sort = params.sort === 'stars' ? 'stars' : 'best-match';

  return { q, page, sort };
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchState = normalizeSearchParams(params);

  return (
    <main>
      <h1>GitHub リポジトリ検索</h1>
      <pre>{JSON.stringify(searchState, null, 2)}</pre>
    </main>
  );
}
