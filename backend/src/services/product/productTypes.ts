/**
 * @summary
 * Type definitions for Product entity.
 *
 * @module services/product/productTypes
 */

/**
 * @interface ProductEntity
 * @description Represents a product entity in the catalog
 */
export interface ProductEntity {
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
  dateModified: string;
}

/**
 * @interface ProductListResponse
 * @description Response structure for listing products
 */
export interface ProductListResponse {
  id: number;
  nome_produto: string;
  codigo_produto: string;
  categoria: string;
  imagem_principal: string;
  indicador_destaque: boolean;
  indicador_novidade: boolean;
  indicador_promocao: boolean;
}

/**
 * @interface ProductListResult
 * @description Paginated list result
 */
export interface ProductListResult {
  items: ProductListResponse[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * @interface ProductQueryParams
 * @description Query parameters for product listing
 */
export interface ProductQueryParams {
  category?: string;
  sort?: 'nome_asc' | 'nome_desc' | 'categoria' | 'data_cadastro' | 'popularidade';
  page?: string;
  pageSize?: string;
  view?: 'grade' | 'lista' | 'compacto';
}
