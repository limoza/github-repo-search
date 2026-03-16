type Props = {
  currentPage: number;
  totalPages: number;
  query: string;
  sort: string;
};

export const Pagination = ({ currentPage, totalPages, query, sort }: Props) => (
  <nav>
    {Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1;

      return (
        <a key={page} href={`/?q=${query}&page=${page}&sort=${sort}`}>
          {page}
          {currentPage === page && '←'}
        </a>
      );
    })}
  </nav>
);
