/**
 * @summary
 * API controller for Product catalog operations.
 * Handles product listing, retrieval, and catalog display.
 *
 * @module api/internal/product/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { productList, productGet, productGetByCategory } from '@/services/product';

/**
 * @api {get} /api/internal/product List Products
 * @apiName ListProducts
 * @apiGroup Product
 *
 * @apiQuery {String} [category] Filter by category
 * @apiQuery {String} [sort] Sort criteria (name_asc | name_desc | category | date_cadastro | popularidade)
 * @apiQuery {Number} [page=1] Page number
 * @apiQuery {Number} [pageSize=12] Items per page (12 | 24 | 36 | 48)
 * @apiQuery {String} [view=grade] View mode (grade | lista | compacto)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data.items List of products
 * @apiSuccess {Number} data.items.id Unique identifier
 * @apiSuccess {String} data.items.nome_produto Product name
 * @apiSuccess {String} data.items.codigo_produto Product code
 * @apiSuccess {String} data.items.categoria Category name
 * @apiSuccess {String} data.items.imagem_principal Main image URL
 * @apiSuccess {Boolean} data.items.indicador_destaque Featured flag
 * @apiSuccess {Boolean} data.items.indicador_novidade New product flag
 * @apiSuccess {Boolean} data.items.indicador_promocao Promotion flag
 * @apiSuccess {Number} data.total Total products count
 * @apiSuccess {Number} data.page Current page
 * @apiSuccess {Number} data.pageSize Items per page
 * @apiSuccess {Number} data.totalPages Total pages
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productList(req.query);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/product/:id Get Product
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {Number} id Product ID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.nome_produto Product name
 * @apiSuccess {String} data.codigo_produto Product code
 * @apiSuccess {String} data.categoria Category name
 * @apiSuccess {String} data.imagem_principal Main image URL
 * @apiSuccess {Boolean} data.indicador_destaque Featured flag
 * @apiSuccess {Boolean} data.indicador_novidade New product flag
 * @apiSuccess {Boolean} data.indicador_promocao Promotion flag
 * @apiSuccess {Boolean} data.indicador_descontinuado Discontinued flag
 * @apiSuccess {String} data.dateCreated ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productGet(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/product/category/:category Get Products by Category
 * @apiName GetProductsByCategory
 * @apiGroup Product
 *
 * @apiParam {String} category Category name
 * @apiQuery {String} [sort] Sort criteria
 * @apiQuery {Number} [page=1] Page number
 * @apiQuery {Number} [pageSize=12] Items per page
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data.items List of products
 * @apiSuccess {Number} data.total Total products count
 * @apiSuccess {Number} data.page Current page
 * @apiSuccess {Number} data.pageSize Items per page
 * @apiSuccess {Number} data.totalPages Total pages
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getByCategoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await productGetByCategory(req.params, req.query);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
