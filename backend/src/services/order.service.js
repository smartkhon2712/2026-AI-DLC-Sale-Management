const prisma = require('../config/prisma');

class OrderService {
  async createOrder(customerId, items) {
    if(!items || items.length === 0) throw new Error("Empty order items");

    return await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: parseInt(item.productId) } });
        if (!product) throw new Error(`Product ID ${item.productId} not found`);
        if (product.stock < item.quantity) {
          throw new Error(`Product [${product.name}] is out of stock (remaining: ${product.stock})`);
        }

        const cost = product.price * item.quantity;
        totalAmount += cost;

        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price
        });
      }

      const order = await tx.order.create({
        data: {
          customerId: parseInt(customerId),
          totalAmount,
          items: {
            create: orderItemsData
          }
        },
        include: { items: true, customer: true }
      });

      return order;
    });
  }

  async updateOrderStatus(orderId, newStatus) {
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({ 
        where: { id: parseInt(orderId) },
        include: { items: true } 
      });
      if (!order) throw new Error('Order not found');
      
      if (order.status === 'PAID') {
        throw new Error('Order already PAID, cannot revert status and restock automatically');
      }

      const updated = await tx.order.update({
        where: { id: parseInt(orderId) },
        data: { status: newStatus }
      });

      if (newStatus === 'PAID') {
        // Decrease stock and increment customer spending stats
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } }
          });
        }
        await tx.customer.update({
          where: { id: order.customerId },
          data: { totalSpend: { increment: order.totalAmount } }
        });
      }
      return updated;
    });
  }

  async getOrders() {
    return prisma.order.findMany({
      include: { customer: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  }
}

module.exports = new OrderService();
