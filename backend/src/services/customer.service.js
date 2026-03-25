const prisma = require('../config/prisma');

class CustomerService {
  async findOrCreateCustomer({ phone, name, email }) {
    let customer = await prisma.customer.findUnique({ where: { phone } });
    if (!customer) {
      if(!name) throw new Error("Name is required for a new customer");
      customer = await prisma.customer.create({
        data: { phone, name, email: email || null }
      });
    }
    return customer;
  }

  async getCustomers() {
    return prisma.customer.findMany({
      orderBy: { totalSpend: 'desc' },
      take: 50
    });
  }
}

module.exports = new CustomerService();
