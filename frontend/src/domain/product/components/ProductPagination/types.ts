export interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: 12 | 24 | 36 | 48;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: 12 | 24 | 36 | 48) => void;
  className?: string;
}
