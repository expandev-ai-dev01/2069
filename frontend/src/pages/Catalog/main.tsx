import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductList } from '@/domain/product/hooks/useProductList';
import { ProductGrid } from '@/domain/product/components/ProductGrid';
import { ViewModeToggle } from '@/domain/product/components/ViewModeToggle';
import { SortSelect } from '@/domain/product/components/SortSelect';
import { ProductPagination } from '@/domain/product/components/ProductPagination';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/core/components/breadcrumb';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/core/components/empty';
import { Package } from 'lucide-react';
import type { SortOption } from '@/domain/product/components/SortSelect/types';

function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State from URL or defaults
  const [viewMode, setViewMode] = useState<'grade' | 'lista' | 'compacto'>(
    (searchParams.get('view') as 'grade' | 'lista' | 'compacto') || 'grade'
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'date_cadastro'
  );
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get('page')) || 1);
  const [pageSize, setPageSize] = useState<12 | 24 | 36 | 48>(
    (Number(searchParams.get('pageSize')) as 12 | 24 | 36 | 48) || 12
  );

  // Fetch products
  const { products, total, totalPages, isLoading } = useProductList({
    filters: {
      sort: sortBy,
      page: currentPage,
      pageSize,
      view: viewMode,
    },
  });

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('view', viewMode);
    params.set('sort', sortBy);
    params.set('page', String(currentPage));
    params.set('pageSize', String(pageSize));
    setSearchParams(params, { replace: true });
  }, [viewMode, sortBy, currentPage, pageSize, setSearchParams]);

  // Save view preferences to cookie
  useEffect(() => {
    document.cookie = `catalog_view=${viewMode}; path=/; max-age=31536000`;
    document.cookie = `catalog_pageSize=${pageSize}; path=/; max-age=31536000`;
  }, [viewMode, pageSize]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleViewModeChange = (newMode: 'grade' | 'lista' | 'compacto') => {
    setViewMode(newMode);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: 12 | 24 | 36 | 48) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Catálogo</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="flex flex-col gap-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Catálogo de Produtos</h1>
            <p className="text-muted-foreground mt-1">
              {total > 0 ? (
                <>
                  {total} {total === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </>
              ) : (
                'Nenhum produto encontrado'
              )}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <SortSelect value={sortBy} onChange={handleSortChange} />
            <ViewModeToggle value={viewMode} onChange={handleViewModeChange} />
          </div>
        </div>
      </header>

      {/* Content */}
      {!isLoading && products.length === 0 ? (
        <Empty className="min-h-[400px]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Package className="size-6" />
            </EmptyMedia>
            <EmptyTitle>Nenhum produto cadastrado</EmptyTitle>
            <EmptyDescription>
              Não há produtos disponíveis no momento. Volte mais tarde para conferir novidades.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <ProductGrid products={products} viewMode={viewMode} isLoading={isLoading} />

          {totalPages > 1 && (
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export { CatalogPage };
