const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://localstack:4566',
  accessKeyId: 'test',
  secretAccessKey: 'test'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const ARTICLES_TABLE = 'Articles';
const COMMENTS_TABLE = 'Comments';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Articles CRUD
app.post('/articles', async (req, res) => {
  const params = {
    TableName: ARTICLES_TABLE,
    Item: { ...req.body, id: Date.now().toString() }
  };
  try {
    await dynamoDB.put(params).promise();
    res.status(201).json(params.Item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/articles', async (req, res) => {
  const params = { TableName: ARTICLES_TABLE };
  try {
    const result = await dynamoDB.scan(params).promise();
    res.json(result.Items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Comments
app.post('/articles/:id/comments', async (req, res) => {
  const params = {
    TableName: COMMENTS_TABLE,
    Item: { ...req.body, articleId: req.params.id, id: Date.now().toString() }
  };
  try {
    await dynamoDB.put(params).promise();
    res.status(201).json(params.Item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Blog backend running on port 3000');
});
