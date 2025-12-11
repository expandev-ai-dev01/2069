import { cn } from '@/core/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import type { SortSelectProps, SortOption } from './types';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'date_cadastro', label: 'Mais recentes' },
  { value: 'name_asc', label: 'Nome (A-Z)' },
  { value: 'name_desc', label: 'Nome (Z-A)' },
  { value: 'category', label: 'Categoria' },
  { value: 'popularidade', label: 'Mais populares' },
];

function SortSelect({ value, onChange, className }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn('w-[200px]', className)} aria-label="Ordenar produtos">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { SortSelect };
