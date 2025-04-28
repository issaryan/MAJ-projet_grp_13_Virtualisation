const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const WebSocket = require('ws');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localstack:4566',
  accessKeyId: 'test',
  secretAccessKey: 'test'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const QUIZZES_TABLE = 'Quizzes';
const RESULTS_TABLE = 'Results';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// WebSocket Server
const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'joinQuiz') {
      // Handle quiz joining
    }
  });
});

// Quiz Endpoints
app.post('/quizzes', async (req, res) => {
  const params = {
    TableName: QUIZZES_TABLE,
    Item: { ...req.body, id: Date.now().toString() }
  };
  try {
    await dynamoDB.put(params).promise();
    res.status(201).json(params.Item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/quizzes/: