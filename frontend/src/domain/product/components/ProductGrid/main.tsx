import { cn } from '@/core/lib/utils';
import { Skeleton } from '@/core/components/skeleton';
import { ProductCard } from '../ProductCard';
import type { ProductGridProps } from './types';

function ProductGrid({ products, viewMode = 'grade', isLoading, className }: ProductGridProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          'grid gap-6',
          viewMode === 'grade' && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          viewMode === 'lista' && 'grid-cols-1',
          viewMode === 'compacto' &&
            'grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12',
          className
        )}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            key={index}
            className={cn(
              viewMode === 'grade' && 'h-80',
              viewMode === 'lista' && 'h-32',
              viewMode === 'compacto' && 'h-32'
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-6',
        viewMode === 'grade' && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        viewMode === 'lista' && 'grid-cols-1',
        viewMode === 'compacto' &&
          'grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12',
        className
      )}
    >
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} viewMode={viewMode} />
      ))}
    </div>
  );
}

export { ProductGrid };
