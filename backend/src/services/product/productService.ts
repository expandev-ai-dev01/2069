/**
 * @summary
 * Business logic for Product catalog.
 * Handles product listing, filtering, sorting, and pagination.
 *
 * @module services/product/productService
 */

import { PRODUCT_DEFAULTS } from '@/constants';
import { productStore, ProductRecord } from '@/instances';
import { ServiceError } from '@/utils';
import { ProductEntity, ProductListResult, ProductListResponse } from './productTypes';
import { listQuerySchema, paramsSchema, categoryParamsSchema } from './productValidation';

/**
 * @summary
 * Checks if a product is considered new (within 30 days of creation).
 *
 * @function isNewProduct
 * @param {string} dateCreated - ISO date string of product creation
 * @returns {boolean} True if product is less than 30 days old
 */
function isNewProduct(dateCreated: string): boolean {
  const created = new Date(dateCreated);
  const now = new Date();
  const daysDiff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return daysDiff <= 30;
}

/**
 * @summary
 * Sorts products according to specified criteria.
 *
 * @function sortProducts
 * @param {ProductRecord[]} products - Array of products to sort
 * @param {string} sortBy - Sort criteria
 * @returns {ProductRecord[]} Sorted products array
 */
function sortProducts(
  products: ProductRecord[],
  sortBy: 'nome_asc' | 'nome_desc' | 'categoria' | 'data_cadastro' | 'popularidade'
): ProductRecord[] {
  const sorted = [...products];

  /**
   * @rule {BR-015}
   * Featured products always appear first, respecting sort criteria among them
   */
  const featured = sorted.filter((p) => p.indicador_destaque);
  const regular = sorted.filter((p) => !p.indicador_destaque);

  const sortFn = (a: ProductRecord, b: ProductRecord) => {
    switch (sortBy) {
      case 'nome_asc':
        return a.nome_produto.localeCompare(b.nome_produto);
      case 'nome_desc':
        return b.nome_produto.localeCompare(a.nome_produto);
      case 'categoria':
        const catCompare = a.categoria.localeCompare(b.categoria);
        return catCompare !== 0 ? catCompare : a.nome_produto.localeCompare(b.nome_produto);
      case 'data_cadastro':
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      case 'popularidade':
        // Placeholder: would use view count from tracking system
        return 0;
      default:
        return 0;
    }
  };

  return [...featured.sort(sortFn), ...regular.sort(sortFn)];
}

/**
 * @summary
 * Paginates an array of products.
 *
 * @function paginateProducts
 * @param {ProductRecord[]} products - Array of products to paginate
 * @param {number} page - Page number (1-based)
 * @param {number} pageSize - Items per page
 * @returns {ProductRecord[]} Paginated products array
 */
function paginateProducts(
  products: ProductRecord[],
  page: number,
  pageSize: number
): ProductRecord[] {
  const startIndex = (page - 1) * pageSize;
  return products.slice(startIndex, startIndex + pageSize);
}

/**
 * @summary
 * Lists products with filtering, sorting, and pagination.
 *
 * @function productList
 * @module services/product
 *
 * @param {unknown} query - Raw query parameters to validate
 * @returns {Promise<ProductListResult>} Paginated list of products
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When query parameters are invalid
 *
 * @example
 * const result = await productList({ page: '1', pageSize: '12', sort: 'nome_asc' });
 * // Returns: { items: [...], total: 50, page: 1, pageSize: 12, totalPages: 5 }
 */
export async function productList(query: unknown): Promise<ProductListResult> {
  const validation = listQuerySchema.safeParse(query);

  if (!validation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Invalid query parameters',
      400,
      validation.error.errors
    );
  }

  const { category, sort, page, pageSize } = validation.data;

  /**
   * @rule {BR-004}
   * Products with indicador_descontinuado=true don't appear in main catalog
   */
  let products = productStore.getAll().filter((p) => !p.indicador_descontinuado);

  /**
   * @rule {DF-002}
   * Apply category filter if active
   */
  if (category) {
    products = products.filter((p) => p.categoria === category);
  }

  /**
   * @rule {DF-003}
   * Apply sorting
   */
  products = sortProducts(products, sort);

  const total = products.length;
  const totalPages = Math.ceil(total / pageSize);

  /**
   * @rule {DF-006}
   * Paginate results
   */
  const paginatedProducts = paginateProducts(products, page, pageSize);

  /**
   * @rule {BR-031}
   * Update novidade indicator based on 30-day rule
   */
  const items: ProductListResponse[] = paginatedProducts.map((p) => ({
    id: p.id,
    nome_produto: p.nome_produto,
    codigo_produto: p.codigo_produto,
    categoria: p.categoria,
    imagem_principal: p.imagem_principal,
    indicador_destaque: p.indicador_destaque,
    indicador_novidade: isNewProduct(p.dateCreated),
    indicador_promocao: p.indicador_promocao,
  }));

  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * @summary
 * Retrieves a specific product by its ID.
 *
 * @function productGet
 * @module services/product
 *
 * @param {unknown} params - Raw request params containing the ID
 * @returns {Promise<ProductEntity>} The found product entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID parameter is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When product doesn't exist
 *
 * @example
 * const product = await productGet({ id: '1' });
 * // Returns: { id: 1, nome_produto: 'Sofá 3 Lugares', ... }
 */
export async function productGet(params: unknown): Promise<ProductEntity> {
  const validation = paramsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const product = productStore.getById(id);

  if (!product) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  return product;
}

/**
 * @summary
 * Lists products filtered by category.
 *
 * @function productGetByCategory
 * @module services/product
 *
 * @param {unknown} params - Raw request params containing category
 * @param {unknown} query - Raw query parameters for sorting and pagination
 * @returns {Promise<ProductListResult>} Paginated list of products in category
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When parameters are invalid
 *
 * @example
 * const result = await productGetByCategory({ category: 'sala-de-estar' }, { page: '1' });
 * // Returns: { items: [...], total: 20, page: 1, pageSize: 12, totalPages: 2 }
 */
export async function productGetByCategory(
  params: unknown,
  query: unknown
): Promise<ProductListResult> {
  const paramsValidation = categoryParamsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Invalid category',
      400,
      paramsValidation.error.errors
    );
  }

  const { category } = paramsValidation.data;

  /**
   * @rule {VA-003}
   * Verify category exists and contains products
   */
  const categoryProducts = productStore
    .getAll()
    .filter((p) => p.categoria === category && !p.indicador_descontinuado);

  if (categoryProducts.length === 0) {
    throw new ServiceError('NOT_FOUND', 'No products found in this category', 404);
  }

  // Reuse productList logic with category filter
  const queryWithCategory =
    typeof query === 'object' && query !== null ? { ...query, category } : { category };
  return productList(queryWithCategory);
}
