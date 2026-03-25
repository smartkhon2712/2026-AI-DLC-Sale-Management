const prisma = require('../config/prisma');

class ReportService {
  async getDashboardMetrics() {
    const totalRevenueAggr = await prisma.order.aggregate({
      where: { status: 'PAID' },
      _sum: { totalAmount: true }
    });
    const orderCount = await prisma.order.count({ where: { status: 'PAID' } });
    const activeProducts = await prisma.product.count({ where: { status: 'ACTIVE' } });

    return {
      totalRevenue: totalRevenueAggr._sum.totalAmount || 0,
      totalPaidOrders: orderCount,
      activeProductsCount: activeProducts
    };
  }
}

module.exports = new ReportService();
