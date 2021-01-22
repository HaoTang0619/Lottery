import { MongoClient } from "mongodb";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://b06902020:b06902020@lottery.e68jz.mongodb.net/lottery?retryWrites=true&w=majority";
const MONGODB_DB = process.env.MONGODB_DB || "lottery";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = global.mongo = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = await MongoClient.connect(MONGODB_URI, opts).then(
      (client) => {
        return {
          client,
          db: client.db(MONGODB_DB),
        };
      },
      () => {
        return {
          client: { isConnected: () => false },
          db: null,
        };
      } // use callback function to catch error
    );
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
