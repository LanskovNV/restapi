const request = require('supertest');
const { app } = require('../utils/config');
const { pageSize } = require('../utils/constants');

describe('Get employees', () => {
  test('should rerurn list of paginated employees', async () => {
    const res = await request(app).get('/api/v1/employees');
    expect(res.body.length).toEqual(pageSize);
    expect(res.statusCode).toBe(200);
  });
});
