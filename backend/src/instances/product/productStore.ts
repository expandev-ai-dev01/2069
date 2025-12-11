/**
 * @summary
 * In-memory store instance for Product entity.
 * Provides singleton pattern for product catalog storage.
 *
 * @module instances/product/productStore
 */

import { PRODUCT_DEFAULTS } from '@/constants/product';

/**
 * Product record structure
 */
export interface ProductRecord {
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
 * In-memory store for Product records
 */
class ProductStore {
  private records: Map<number, ProductRecord> = new Map();
  private currentId: number = 0;

  constructor() {
    this.seedInitialData();
  }

  /**
   * Seed initial product data for demonstration
   */
  private seedInitialData(): void {
    const categories = ['Sala de Estar', 'Quarto', 'Cozinha', 'Escritório', 'Área Externa'];
    const products = [
      { name: 'Sofá 3 Lugares Premium', category: 'Sala de Estar', featured: true },
      { name: 'Mesa de Jantar Extensível', category: 'Cozinha', featured: false },
      { name: 'Cama Box Queen Size', category: 'Quarto', featured: true },
      { name: 'Escrivaninha Executiva', category: 'Escritório', featured: false },
      { name: 'Poltrona Reclinável', category: 'Sala de Estar', featured: false },
      { name: 'Guarda-Roupa 6 Portas', category: 'Quarto', featured: false },
      { name: 'Cadeira de Escritório Ergonômica', category: 'Escritório', featured: true },
      { name: 'Conjunto de Jardim', category: 'Área Externa', featured: false },
      { name: 'Rack para TV 65"', category: 'Sala de Estar', featured: false },
      { name: 'Buffet Moderno', category: 'Cozinha', featured: false },
      { name: 'Criado-Mudo com Gavetas', category: 'Quarto', featured: false },
      { name: 'Estante para Livros', category: 'Escritório', featured: false },
    ];

    products.forEach((product, index) => {
      const now = new Date();
      const daysAgo = Math.floor(Math.random() * 60);
      const dateCreated = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

      this.add({
        id: this.getNextId(),
        nome_produto: product.name,
        codigo_produto: `MOV-${String(index + 1).padStart(4, '0')}`,
        categoria: product.category,
        imagem_principal: `/images/products/product-${index + 1}.jpg`,
        indicador_destaque: product.featured,
        indicador_novidade: daysAgo <= 30,
        indicador_promocao: Math.random() > 0.7,
        indicador_descontinuado: false,
        dateCreated,
        dateModified: dateCreated,
      });
    });
  }

  /**
   * Get next available ID
   */
  getNextId(): number {
    this.currentId += 1;
    return this.currentId;
  }

  /**
   * Get all records
   */
  getAll(): ProductRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: number): ProductRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: ProductRecord): ProductRecord {
    if (this.records.size >= PRODUCT_DEFAULTS.MAX_RECORDS) {
      throw new Error('Maximum records limit reached');
    }
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: number, data: Partial<ProductRecord>): ProductRecord | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data, dateModified: new Date().toISOString() };
    this.records.set(id, updated);
    return updated;
  }

  /**
   * Delete record by ID
   */
  delete(id: number): boolean {
    return this.records.delete(id);
  }

  /**
   * Check if record exists
   */
  exists(id: number): boolean {
    return this.records.has(id);
  }

  /**
   * Get total count of records
   */
  count(): number {
    return this.records.size;
  }

  /**
   * Clear all records (useful for testing)
   */
  clear(): void {
    this.records.clear();
    this.currentId = 0;
  }
}

/**
 * Singleton instance of ProductStore
 */
export const productStore = new ProductStore();
