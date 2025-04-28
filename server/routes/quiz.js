const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Créer un quiz
router.post('/', async (req, res) => {
  try {
    const quiz = {
      quizId: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    await dynamoDB.put({
      TableName: 'Quizzes',
      Item: quiz
    }).promise();

    res.status(201).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Obtenir tous les quizzes
router.get('/', async (req, res) => {
  try {
    const result = await dynamoDB.scan({
      TableName: 'Quizzes'
    }).promise();

    res.json(result.Items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Démarrer une session de quiz
router.post('/:quizId/session', async (req, res) => {
  try {
    const sessionId = uuidv4();
    res.json({ sessionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
