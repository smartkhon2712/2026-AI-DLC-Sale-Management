const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

class AuthService {
  async register(username, password, role = 'STAFF') {
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) throw new Error('Username already exists');
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword, role }
    });
    return user;
  }

  async login(username, password) {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return { token, role: user.role, username: user.username };
  }
}

module.exports = new AuthService();
