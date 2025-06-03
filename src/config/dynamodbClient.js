// src/config/dynamoClient.js
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'ap-south-1' 
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

export default ddbDocClient;
