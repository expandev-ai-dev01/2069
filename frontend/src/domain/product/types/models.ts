/**
 * Product domain type definitions
 * @module domain/product/types/models
 */

export interface Product {
  id: number;
  nome_produto: string;
  codigo_produto: string;
  categoria: string;
  imagem_principal: string;
  indicador_destaque: boolean;
  indicador_novidade: boolean;
  indicador_promocao: boolean;
  indicador_descontinuado: boolean;
  dateCreated: string;
}

export interface ProductListParams {
  category?: string;
  sort?: 'name_asc' | 'name_desc' | 'category' | 'date_cadastro' | 'popularidade';
  page?: number;
  pageSize?: 12 | 24 | 36 | 48;
  view?: 'grade' | 'lista' | 'compacto';
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
