import { LayoutGrid, List, Grid3x3 } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import { Button } from '@/core/components/button';
import type { ViewModeToggleProps } from './types';

function ViewModeToggle({ value, onChange, className }: ViewModeToggleProps) {
  return (
    <div
      className={cn('flex items-center gap-1 rounded-md border p-1', className)}
      role="group"
      aria-label="Modo de visualização"
    >
      <Button
        variant={value === 'grade' ? 'default' : 'ghost'}
        size="icon-sm"
        onClick={() => onChange('grade')}
        aria-label="Visualização em grade"
        aria-pressed={value === 'grade'}
      >
        <LayoutGrid />
      </Button>
      <Button
        variant={value === 'lista' ? 'default' : 'ghost'}
        size="icon-sm"
        onClick={() => onChange('lista')}
        aria-label="Visualização em lista"
        aria-pressed={value === 'lista'}
      >
        <List />
      </Button>
      <Button
        variant={value === 'compacto' ? 'default' : 'ghost'}
        size="icon-sm"
        onClick={() => onChange('compacto')}
        aria-label="Visualização compacta"
        aria-pressed={value === 'compacto'}
      >
        <Grid3x3 />
      </Button>
    </div>
  );
}

export { ViewModeToggle };
