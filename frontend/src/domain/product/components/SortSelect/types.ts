export type SortOption = 'name_asc' | 'name_desc' | 'category' | 'date_cadastro' | 'popularidade';

export interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}
