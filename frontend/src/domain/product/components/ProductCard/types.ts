import type { Product } from '../../types/models';

export interface ProductCardProps {
  product: Product;
  viewMode?: 'grade' | 'lista' | 'compacto';
  className?: string;
}
