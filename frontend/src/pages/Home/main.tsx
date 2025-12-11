import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Package } from 'lucide-react';

function HomePage() {
  const { navigate } = useNavigation();

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center space-y-6 py-12 text-center">
      <div className="bg-primary/10 size-20 flex items-center justify-center rounded-full">
        <Package className="text-primary size-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Lozorio Móveis</h1>
        <p className="text-muted-foreground text-lg">Catálogo digital de móveis</p>
      </div>
      <Button size="lg" onClick={() => navigate('/catalogo')}>
        Ver Catálogo
      </Button>
    </div>
  );
}

export { HomePage };
