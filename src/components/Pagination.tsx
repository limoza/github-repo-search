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
    <nav aria-label="ページネーション">
      <ul>
        {!isFirstPage && (
          <li>
            <Button asChild variant="outline">
              <Link href={buildPageHref(currentPage - 1)}>戻る</Link>
            </Button>
          </li>
        )}

        {paginationItems.map((item, index) => {
          if (item.type === 'ellipsis') {
            return (
              <li key={`ellipsis-${index}`}>
                <span>…</span>
              </li>
            );
          }

          const isCurrentPage = item.value === currentPage;

          return (
            <li key={item.value}>
              {isCurrentPage ? (
                <span aria-current="page">{item.value}</span>
              ) : (
                <Button asChild variant="outline">
                  <Link href={buildPageHref(item.value)}>{item.value}</Link>
                </Button>
              )}
            </li>
          );
        })}

        {!isLastPage && (
          <li>
            <Button asChild variant="outline">
              <Link href={buildPageHref(currentPage + 1)}>進む</Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
};
