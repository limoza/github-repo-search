export type PaginationItem =
  | { type: 'page'; value: number }
  | { type: 'ellipsis' };

type BuildPaginationItemsParams = {
  currentPage: number;
  totalPages: number;
};

const SIBLING_COUNT = 4;

export const buildPaginationItems = ({
  currentPage,
  totalPages,
}: BuildPaginationItemsParams): PaginationItem[] => {
  if (totalPages <= 0) {
    return [];
  }

  const startPage = Math.max(currentPage - SIBLING_COUNT, 1);
  const endPage = Math.min(currentPage + SIBLING_COUNT, totalPages);

  const items: PaginationItem[] = [];

  if (startPage > 1) {
    items.push({ type: 'page', value: 1 });

    if (startPage > 2) {
      items.push({ type: 'ellipsis' });
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    items.push({ type: 'page', value: page });
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      items.push({ type: 'ellipsis' });
    }

    items.push({ type: 'page', value: totalPages });
  }

  return items;
};
