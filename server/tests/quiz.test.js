const request = require('supertest');
const app = require('../server');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

beforeAll(async () => {
  await dynamoDB.put({
    TableName: 'Quizzes',
    Item: {
      quizId: 'test-quiz-id',
      title: 'Test Quiz',
      questions: [],
      createdBy: 'test@example.com',
      createdAt: new Date().toISOString()
    }
  }).promise();
});

describe('Quiz API', () => {
  test('POST /quiz - créer un quiz', async () => {
    const response = await request(app)
      .post('/quiz')
      .send({
        title: 'New Quiz',
        questions: []
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.quizId).toBeDefined();
  });

  test('GET /quiz - obtenir tous les quizzes', async () => {
    const response = await request(app)
      .get('/quiz');
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('POST /quiz/:quizId/session - démarrer une session', async () => {
    const response = await request(app)
      .post('/quiz/test-quiz-id/session');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.sessionId).toBeDefined();
  });
});
