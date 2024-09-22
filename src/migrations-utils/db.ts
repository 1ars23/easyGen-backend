import { MongoClient } from 'mongodb';

require('dotenv').config();

const MONGO_URL = process.env.MONGODB_USER && process.env.MONGODB_PASSWORD
  ? `mongodb://${encodeURIComponent(process.env.MONGODB_USER)}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?tls=true&tlsCAFile=global-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`
  : `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;

export const getDb = async () => {
  const client: any = await MongoClient.connect(MONGO_URL);
  return client.db();
};
