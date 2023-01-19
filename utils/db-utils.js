import { MongoClient } from 'mongodb';

export async function connect() {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  return client;
}

export async function insertOne(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAll(client, collection, filter, sorting) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sorting)
    .toArray();
  return documents;
}
