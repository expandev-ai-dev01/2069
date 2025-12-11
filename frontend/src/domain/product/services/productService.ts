/**
 * @service Product Service
 * @domain product
 * @type REST API
 *
 * Product catalog service for fetching and managing product data
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Product, ProductListParams, ProductListResponse } from '../types/models';

export const productService = {
  /**
   * List products with filters and pagination
   */
  async list(params?: ProductListParams): Promise<ProductListResponse> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: ProductListResponse }>(
      '/product',
      { params }
    );
    return data.data;
  },

  /**
   * Get single product by ID
   */
  async getById(id: number): Promise<Product> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: Product }>(
      `/product/${id}`
    );
    return data.data;
  },

  /**
   * Get products by category
   */
  async getByCategory(
    category: string,
    params?: Omit<ProductListParams, 'category'>
  ): Promise<ProductListResponse> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: ProductListResponse }>(
      `/product/category/${category}`,
      { params }
    );
    return data.data;
  },
};
