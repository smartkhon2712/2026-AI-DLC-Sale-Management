const prisma = require('../config/prisma');

class ProductService {
  async createCategory(data) {
    return prisma.category.create({ data });
  }

  async getCategories() {
    return prisma.category.findMany();
  }

  async createProduct({ sku, name, price, cost, stock, categoryId }) {
    return prisma.product.create({
      data: { sku, name, price, cost, stock, categoryId: parseInt(categoryId) }
    });
  }

  async updateProduct(id, data) {
    return prisma.product.update({
      where: { id: parseInt(id) },
      data
    });
  }

  async getProducts(keyword) {
    const where = keyword ? {
      OR: [
        { name: { contains: keyword, mode: 'insensitive' } },
        { sku: { contains: keyword, mode: 'insensitive' } }
      ]
    } : {};
    return prisma.product.findMany({ where, include: { category: true }, orderBy: { createdAt: 'desc' } });
  }
}

module.exports = new ProductService();
