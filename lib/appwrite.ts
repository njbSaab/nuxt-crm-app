// appwrite.ts
import { Client } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Correct Appwrite API endpoint
  .setProject('676d7e97001abc17a844'); // Correct Project ID from your Appwrite dashboard

export default client;