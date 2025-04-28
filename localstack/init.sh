#!/bin/bash

# Wait for LocalStack
while ! nc -z localhost 4566; do sleep 1; done

# Create DynamoDB Tables
awslocal dynamodb create-table \
  --table-name Quizzes \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

awslocal dynamodb create-table \
  --table-name QuizResults \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST

# Create SNS Topic
awslocal sns create-topic --name QuizResultsNotifications

# Create WebSocket API
API_ID=$(awslocal apigatewayv2 create-api \
  --name QuizWebSocketApi \
  --protocol-type WEBSOCKET \
  --route-selection-expression '$request.body.action' \
  --output text --query 'ApiId')

# Create Lambda for answer processing
awslocal lambda create-function \
  --function-name processAnswer \
  --runtime nodejs18.x \
  --handler index.handler \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --zip-file fileb:///docker-entrypoint-initaws.d/lambda.zip

echo "LocalStack initialized"
