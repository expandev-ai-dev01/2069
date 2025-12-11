/**
 * @summary
 * Validation schemas for Product entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/product/productValidation
 */

import { z } from 'zod';
import { PRODUCT_LIMITS, PRODUCT_SORT_OPTIONS, PRODUCT_VIEW_MODES } from '@/constants';

/**
 * Schema for product list query parameters
 */
export const listQuerySchema = z.object({
  category: z.string().optional(),
  sort: z
    .enum([
      PRODUCT_SORT_OPTIONS.NAME_ASC,
      PRODUCT_SORT_OPTIONS.NAME_DESC,
      PRODUCT_SORT_OPTIONS.CATEGORY,
      PRODUCT_SORT_OPTIONS.DATE,
      PRODUCT_SORT_OPTIONS.POPULARITY,
    ])
    .optional()
    .default(PRODUCT_SORT_OPTIONS.DATE),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce
    .number()
    .int()
    .refine((val) => [12, 24, 36, 48].includes(val), {
      message: 'Page size must be 12, 24, 36, or 48',
    })
    .optional()
    .default(12),
  view: z
    .enum([PRODUCT_VIEW_MODES.GRADE, PRODUCT_VIEW_MODES.LISTA, PRODUCT_VIEW_MODES.COMPACTO])
    .optional()
    .default(PRODUCT_VIEW_MODES.GRADE),
});

/**
 * Schema for ID parameter validation
 */
export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Schema for category parameter validation
 */
export const categoryParamsSchema = z.object({
  category: z.string().min(1).max(PRODUCT_LIMITS.CATEGORY_MAX_LENGTH),
});

/**
 * Inferred types from schemas
 */
export type ListQueryInput = z.infer<typeof listQuerySchema>;
export type ParamsInput = z.infer<typeof paramsSchema>;
export type CategoryParamsInput = z.infer<typeof categoryParamsSchema>;
