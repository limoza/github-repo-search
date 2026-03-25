import { redirect } from 'next/navigation';

import { Pagination } from '@/components/Pagination';
import { RepoList } from '@/components/RepoList';
import type { SearchState } from '@/features/repository-search/types';
import { buildSearchUrl } from '@/lib/buildSearchUrl';
import { searchRepositories } from '@/lib/github';
import type { GitHubRepositorySearchResponse } from '@/types/github';

type Props = {
  searchState: SearchState;
};

const PER_PAGE = 10;
const MAX_SEARCH_RESULT_PAGES = 100;
const MAX_DISPLAYABLE_RESULTS = PER_PAGE * MAX_SEARCH_RESULT_PAGES;

export const SearchResultsSection = async ({ searchState }: Props) => {
  if (!searchState.q) {
    return (
      <section className="space-y-2">
        <p className="mt-3 text-sm text-muted-foreground">
          キーワードを入力して検索してください。
        </p>
      </section>
    );
  }

  const requestedPage = searchState.page;
  const currentPage = Math.min(
    Math.max(requestedPage, 1),
    MAX_SEARCH_RESULT_PAGES,
  );

  const repositoriesData: GitHubRepositorySearchResponse =
    await searchRepositories({
      q: searchState.q,
      page: currentPage,
      perPage: PER_PAGE,
      sort: searchState.sort,
    });

  const apiTotalCount = repositoriesData.total_count;
  const displayTotalCount = Math.min(apiTotalCount, MAX_DISPLAYABLE_RESULTS);
  const hasResults = displayTotalCount > 0;
  const totalPages = Math.ceil(displayTotalCount / PER_PAGE);

  const isPageOutOfRange = hasResults && requestedPage > totalPages;

  if (isPageOutOfRange) {
    const redirectUrl = buildSearchUrl({
      currentSearchParams: '',
      query: searchState.q,
      page: totalPages,
      sort: searchState.sort,
    });

    redirect(redirectUrl);
  }

  const startItemNumber = hasResults ? (currentPage - 1) * PER_PAGE + 1 : 0;
  const endItemNumber = hasResults
    ? Math.min(currentPage * PER_PAGE, displayTotalCount)
    : 0;

  return (
    <section className="mt-3 space-y-6">
      <div className="border-b pb-3">
        <h2 className="text-xl tracking-tight text-foreground">
          <span className="font-bold">{searchState.q}</span>
          <span className="ml-1 text-base">の検索結果</span>
        </h2>

        {hasResults && (
          <p className="mt-0.5 text-sm text-muted-foreground">
            {displayTotalCount.toLocaleString()}件中 {startItemNumber}–
            {endItemNumber}件を表示
          </p>
        )}
      </div>

      {!hasResults ? (
        <div>
          <p className="font-medium text-foreground">
            該当するリポジトリが見つかりませんでした。
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            キーワードを短くする、別の単語にする、表記を変えるなどして再度お試しください。
          </p>
        </div>
      ) : (
        <>
          <RepoList items={repositoriesData.items} />

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            query={searchState.q}
            sort={searchState.sort}
          />
        </>
      )}
    </section>
  );
};
