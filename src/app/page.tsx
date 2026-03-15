import { searchRepositories } from '@/src/lib/github';
import type { RawSearchParams } from '@/src/features/repository-search/type';
import { normalizeSearchParams } from '@/src/features/repository-search/search-params';

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
