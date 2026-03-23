import Link from 'next/link';

import { Button } from '@/components/ui/button';
import type { SortOption } from '@/features/repository-search/constants';
import { buildPaginationItems } from '@/lib/buildPaginationItems';
import { buildSearchUrl } from '@/lib/buildSearchUrl';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  query: string;
  sort: SortOption;
};

export const Pagination = ({
  currentPage,
  totalPages,
  query,
  sort,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const paginationItems = buildPaginationItems({
    currentPage,
    totalPages,
  });

  const buildPageHref = (page: number) => {
    return buildSearchUrl({
      currentSearchParams: '',
      query,
      page,
      sort,
    });
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav aria-label="ページネーション" className="pt-2">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {!isFirstPage && (
          <li>
            <Button asChild variant="outline" className="h-10 min-w-10">
              <Link href={buildPageHref(currentPage - 1)} aria-label="戻る">
                <span aria-hidden="true">&lt;</span>
              </Link>
            </Button>
          </li>
        )}

        {paginationItems.map((item, index) => {
          if (item.type === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`}>
                <span className="flex h-10 min-w-10 items-center justify-center text-sm text-muted-foreground">
                  …
                </span>
              </li>
            );
          }

          const isCurrentPage = item.value === currentPage;

          return (
            <li key={item.value}>
              {isCurrentPage ? (
                <span
                  aria-current="page"
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-primary bg-primary px-3 text-sm font-medium text-primary-foreground"
                >
                  {item.value}
                </span>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  className="h-10 min-w-10 px-3"
                >
                  <Link href={buildPageHref(item.value)}>{item.value}</Link>
                </Button>
              )}
            </li>
          );
        })}

        {!isLastPage && (
          <li>
            <Button asChild variant="outline" className="h-10 min-w-10">
              <Link href={buildPageHref(currentPage + 1)} aria-label="進む">
                <span aria-hidden="true">&gt;</span>
              </Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};
