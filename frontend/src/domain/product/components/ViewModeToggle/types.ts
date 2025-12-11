export interface ViewModeToggleProps {
  value: 'grade' | 'lista' | 'compacto';
  onChange: (value: 'grade' | 'lista' | 'compacto') => void;
  className?: string;
}
