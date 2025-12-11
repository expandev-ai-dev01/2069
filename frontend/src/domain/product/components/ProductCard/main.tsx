import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/core/lib/utils';
import { Badge } from '@/core/components/badge';
import type { ProductCardProps } from './types';

const productCardVariants = cva(
  'group relative overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-lg',
  {
    variants: {
      viewMode: {
        grade: 'flex flex-col p-4',
        lista: 'flex flex-row items-center gap-4 p-4',
        compacto: 'flex flex-col items-center p-2',
      },
    },
    defaultVariants: {
      viewMode: 'grade',
    },
  }
);

const imageVariants = cva('object-cover transition-transform duration-200 group-hover:scale-105', {
  variants: {
    viewMode: {
      grade: 'aspect-[4/3] w-full rounded-md',
      lista: 'h-24 w-24 shrink-0 rounded-md',
      compacto: 'h-20 w-20 rounded-sm',
    },
  },
  defaultVariants: {
    viewMode: 'grade',
  },
});

function ProductCard({
  product,
  viewMode = 'grade',
  className,
}: ProductCardProps & VariantProps<typeof productCardVariants>) {
  const showBadges = viewMode !== 'compacto';

  return (
    <article className={cn(productCardVariants({ viewMode }), className)}>
      {/* Badges Container */}
      {showBadges && (
        <div className="absolute right-2 top-2 z-10 flex flex-col gap-1">
          {product.indicador_destaque && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Destaque
            </Badge>
          )}
          {product.indicador_novidade && (
            <Badge variant="secondary" className="bg-blue-500 text-white">
              Novidade
            </Badge>
          )}
          {product.indicador_promocao && (
            <Badge variant="destructive" className="bg-red-500 text-white">
              Promoção
            </Badge>
          )}
        </div>
      )}

      {/* Image */}
      <div className={cn('relative overflow-hidden', viewMode === 'lista' && 'shrink-0')}>
        <img
          src={product.imagem_principal}
          alt={product.nome_produto}
          loading="lazy"
          className={imageVariants({ viewMode })}
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          'flex flex-col',
          viewMode === 'grade' && 'mt-3 gap-2',
          viewMode === 'lista' && 'flex-1 gap-1',
          viewMode === 'compacto' && 'mt-2 items-center gap-1'
        )}
      >
        <h3
          className={cn(
            'line-clamp-2 font-semibold',
            viewMode === 'grade' && 'text-base',
            viewMode === 'lista' && 'text-base',
            viewMode === 'compacto' && 'text-center text-xs'
          )}
        >
          {product.nome_produto}
        </h3>

        {viewMode !== 'compacto' && (
          <>
            <p className="text-muted-foreground text-sm">{product.categoria}</p>
            <p className="text-muted-foreground text-xs">Cód: {product.codigo_produto}</p>
          </>
        )}

        {viewMode === 'compacto' && (
          <p className="text-muted-foreground text-xs">Cód: {product.codigo_produto}</p>
        )}
      </div>
    </article>
  );
}

export { ProductCard };
