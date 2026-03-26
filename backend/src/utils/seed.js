const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');

async function checkAndSeed() {
  try {
    // 1. Check if ANY user exists to see if DB is populated
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });

    if (existingAdmin) {
      console.log('[Seed] Database is already seeded. Skipping seed process.');
      return;
    }

    console.log('[Seed] No admin found. Seeding initial data...');

    // 2. Seed Users (Admin và Staff)
    const saltRounds = 10;
    const adminPassword = await bcrypt.hash('admin123', saltRounds);
    const staffPassword = await bcrypt.hash('staff123', saltRounds);

    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    const staff = await prisma.user.create({
      data: {
        username: 'staff1',
        password: staffPassword,
        role: 'STAFF',
      },
    });
    console.log('[Seed] Users seeded (admin/admin123, staff1/staff123)');

    // 3. Seed Categories
    const electronics = await prisma.category.create({
      data: {
        name: 'Điện tử',
        description: 'Các thiết bị điện tử, máy tính, điện thoại',
      },
    });

    const clothing = await prisma.category.create({
      data: {
        name: 'Thời trang',
        description: 'Quần áo, phụ kiện thời trang',
      },
    });
    console.log('[Seed] Categories seeded (Điện tử, Thời trang)');

    // 4. Seed Products (with placeholder images)
    await prisma.product.createMany({
      data: [
        {
          sku: 'SP-ELEC-001',
          name: 'Laptop Gaming Dell G15',
          price: 25000000,
          cost: 20000000,
          stock: 15,
          categoryId: electronics.id,
          imageUrl: 'https://via.placeholder.com/300?text=Laptop+Dell',
          status: 'ACTIVE',
        },
        {
          sku: 'SP-ELEC-002',
          name: 'Điện thoại iPhone 15 Pro Max',
          price: 33000000,
          cost: 29000000,
          stock: 30,
          categoryId: electronics.id,
          imageUrl: 'https://via.placeholder.com/300?text=iPhone+15',
          status: 'ACTIVE',
        },
        {
          sku: 'SP-CLO-001',
          name: 'Áo thun nam Cotton',
          price: 150000,
          cost: 80000,
          stock: 100,
          categoryId: clothing.id,
          imageUrl: 'https://via.placeholder.com/300?text=Ao+Thun+Nam',
          status: 'ACTIVE',
        },
        {
          sku: 'SP-CLO-002',
          name: 'Quần Jeans nữ ống rộng',
          price: 350000,
          cost: 180000,
          stock: 50,
          categoryId: clothing.id,
          imageUrl: 'https://via.placeholder.com/300?text=Quan+Jeans+Nu',
          status: 'ACTIVE',
        },
      ],
    });
    
    // Retrieve products to link to orders
    const products = await prisma.product.findMany();

    console.log('[Seed] Products seeded with placeholder images');

    // 5. Seed Customers
    const customer1 = await prisma.customer.create({
      data: {
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        email: 'vana@example.com',
      },
    });

    const customer2 = await prisma.customer.create({
      data: {
        name: 'Trần Thị B',
        phone: '0987654321',
        email: 'thib@example.com',
      },
    });
    console.log('[Seed] Customers seeded (Nguyễn Văn A, Trần Thị B)');

    // 6. Seed Orders
    // Create an order for Customer 1
    const order1Items = [
      { productId: products[0].id, quantity: 1, price: products[0].price },
      { productId: products[2].id, quantity: 2, price: products[2].price }
    ];
    const order1Total = order1Items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    await prisma.order.create({
      data: {
        customerId: customer1.id,
        totalAmount: order1Total,
        status: 'PAID',
        items: {
          create: order1Items,
        },
      },
    });

    // Update customer spend
    await prisma.customer.update({
      where: { id: customer1.id },
      data: { totalSpend: order1Total },
    });

    console.log('[Seed] Orders seeded');
    console.log('[Seed] SUCCESS: Seed data check passed and executed successfully.');

  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
  }
}

module.exports = checkAndSeed;
