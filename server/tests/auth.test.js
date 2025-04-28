const request = require('supertest');
const app = require('../server');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566',
  accessKeyId: 'test',
  secretAccessKey: 'test'
});

describe('Auth API', () => {
  it('POST /auth/register - should create new user', async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    
    const response = await request(app)
      .post('/auth/register')
      .send({
        email: testEmail,
        name: 'Test User',
        password: 'TEST'
      })
      .expect(201);

    expect(response.body.email).toBe(testEmail);
  });

  it('POST /auth/login - should authenticate with TEST password', async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    
    await request(app)
      .post('/auth/register')
      .send({
        email: testEmail,
        name: 'Test User',
        password: 'TEST'
      });

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: testEmail,
        password: 'TEST'
      })
      .expect(200);

    expect(response.body.token).toBeTruthy();
  });
});
