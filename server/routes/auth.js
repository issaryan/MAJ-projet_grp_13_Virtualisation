const express = require('express');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localstack:4566',
  accessKeyId: 'test',
  secretAccessKey: 'test'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

router.post('/register', async (req, res) => {
  const user = {
    userId: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  await dynamoDB.put({
    TableName: 'Users',
    Item: user
  }).promise();

  res.status(201).json(user);
});

router.post('/login', async (req, res) => {
  const { email } = req.body;

  const { Item } = await dynamoDB.get({
    TableName: 'Users',
    Key: { email }
  }).promise();

  if (!Item) {
    return res.status(401).json({ error: 'User not found' });
  }

  res.json({
    token: 'test-token',
    user: {
      email: Item.email,
      name: Item.name
    }
  });
});

module.exports = router;
