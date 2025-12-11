import type { Product } from '../../types/models';

export interface ProductGridProps {
  products: Product[];
  viewMode?: 'grade' | 'lista' | 'compacto';
  isLoading?: boolean;
  className?: string;
}
