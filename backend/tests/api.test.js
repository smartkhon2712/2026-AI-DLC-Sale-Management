const request = require('supertest');
const app = require('../src/server');

// Basic API endpoint mock test
describe('API Health Check', () => {
  it('should receive 401 Unauthorized when accessing protected route without JWT', async () => {
    const res = await request(app).get('/api/v1/products');
    expect(res.statusCode).toEqual(401);
    expect(res.body.success).toEqual(false);
    expect(res.body.errorCode).toEqual('UNAUTHORIZED');
  });
});
