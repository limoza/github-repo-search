import { searchRepositories } from '@/lib/github';
import { normalizeSearchParams } from '@/features/repository-search/search-params';
import type { RawSearchParams } from '@/features/repository-search/types';

type SearchParams = Promise<RawSearchParams>;

type PageProps = {
  searchParams: SearchParams;
};

const PER_PAGE = 10;

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchState = normalizeSearchParams(params);

  const hasQuery = searchState.q !== '';

  const repositoriesData = !hasQuery
    ? null
    : await searchRepositories({
        q: searchState.q,
        page: searchState.page,
        perPage: PER_PAGE,
        sort: searchState.sort,
      });

  return (
    <main>
      <h1>GitHub リポジトリ検索</h1>

      {!hasQuery ? (
        <p>キーワードを入力して検索してください。</p>
      ) : (
        repositoriesData && (
          <pre>
            {JSON.stringify(repositoriesData.items.slice(0, 3), null, 2)}
          </pre>
        )
      )}
    </main>
  );
}
