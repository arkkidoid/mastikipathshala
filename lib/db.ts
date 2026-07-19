import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "mkp";

/**
 * Cache the client across hot reloads (dev) and warm serverless invocations (prod)
 * so we don't open a new connection pool on every request.
 */
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mkpMongo: Promise<MongoClient> | undefined;
}

export function hasDb() {
  return Boolean(uri);
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }
  if (process.env.NODE_ENV === "development") {
    if (!global._mkpMongo) {
      global._mkpMongo = new MongoClient(uri).connect();
    }
    return global._mkpMongo;
  }
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
