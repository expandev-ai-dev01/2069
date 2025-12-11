/**
 * @summary
 * Default values and constants for Product catalog.
 * Provides centralized configuration for catalog display, pagination,
 * and product attributes.
 *
 * @module constants/product/productDefaults
 */

/**
 * @interface ProductDefaultsType
 * @description Default configuration values for product catalog.
 *
 * @property {number} ITEMS_PER_PAGE - Default number of products per page (12)
 * @property {number} MAX_RECORDS - Maximum products in memory storage (10000)
 * @property {string} DEFAULT_SORT - Default sort criteria ('data_cadastro')
 * @property {string} DEFAULT_VIEW - Default view mode ('grade')
 * @property {number} FEATURED_MAX_PERCENT - Max percentage of featured products per page (25)
 * @property {number} NOVIDADE_DAYS - Days a product is considered new (30)
 */
export const PRODUCT_DEFAULTS = {
  /** Default products per page */
  ITEMS_PER_PAGE: 12,
  /** Maximum allowed products in memory */
  MAX_RECORDS: 10000,
  /** Default sort criteria */
  DEFAULT_SORT: 'data_cadastro' as const,
  /** Default view mode */
  DEFAULT_VIEW: 'grade' as const,
  /** Maximum percentage of featured products per page */
  FEATURED_MAX_PERCENT: 25,
  /** Days a product is considered new */
  NOVIDADE_DAYS: 30,
} as const;

/** Type representing the PRODUCT_DEFAULTS constant */
export type ProductDefaultsType = typeof PRODUCT_DEFAULTS;

/**
 * @interface ProductLimitsType
 * @description Validation constraints for Product entity fields.
 *
 * @property {number} NAME_MIN_LENGTH - Minimum characters for product name (1)
 * @property {number} NAME_MAX_LENGTH - Maximum characters for product name (50)
 * @property {number} CODE_MAX_LENGTH - Maximum characters for product code (50)
 * @property {number} CATEGORY_MAX_LENGTH - Maximum characters for category (100)
 * @property {number} IMAGE_MAX_SIZE_MB - Maximum image size in MB (2)
 * @property {number} IMAGE_MIN_WIDTH - Minimum image width in pixels (800)
 * @property {number} IMAGE_MIN_HEIGHT - Minimum image height in pixels (600)
 */
export const PRODUCT_LIMITS = {
  NAME_MIN_LENGTH: 1,
  NAME_MAX_LENGTH: 50,
  CODE_MAX_LENGTH: 50,
  CATEGORY_MAX_LENGTH: 100,
  IMAGE_MAX_SIZE_MB: 2,
  IMAGE_MIN_WIDTH: 800,
  IMAGE_MIN_HEIGHT: 600,
} as const;

/** Type representing the PRODUCT_LIMITS constant */
export type ProductLimitsType = typeof PRODUCT_LIMITS;

/**
 * @interface ProductSortOptionsType
 * @description Available sort criteria for product catalog.
 *
 * @property {string} NAME_ASC - Sort by name A-Z ('nome_asc')
 * @property {string} NAME_DESC - Sort by name Z-A ('nome_desc')
 * @property {string} CATEGORY - Sort by category ('categoria')
 * @property {string} DATE - Sort by creation date ('data_cadastro')
 * @property {string} POPULARITY - Sort by popularity ('popularidade')
 */
export const PRODUCT_SORT_OPTIONS = {
  NAME_ASC: 'nome_asc',
  NAME_DESC: 'nome_desc',
  CATEGORY: 'categoria',
  DATE: 'data_cadastro',
  POPULARITY: 'popularidade',
} as const;

/** Type representing the PRODUCT_SORT_OPTIONS constant */
export type ProductSortOptionsType = typeof PRODUCT_SORT_OPTIONS;

/**
 * @interface ProductViewModesType
 * @description Available view modes for product catalog.
 *
 * @property {string} GRADE - Grid view with large images ('grade')
 * @property {string} LISTA - List view with more details ('lista')
 * @property {string} COMPACTO - Compact view with thumbnails ('compacto')
 */
export const PRODUCT_VIEW_MODES = {
  GRADE: 'grade',
  LISTA: 'lista',
  COMPACTO: 'compacto',
} as const;

/** Type representing the PRODUCT_VIEW_MODES constant */
export type ProductViewModesType = typeof PRODUCT_VIEW_MODES;
