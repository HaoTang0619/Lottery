import { ObjectId } from "mongodb";
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
  const { client, db } = await connectToDatabase();
  const isConnected = await client.isConnected();

  if (isConnected) {
    await db
      .collection("user")
      // eslint-disable-next-line dot-notation
      .deleteOne({ _id: ObjectId(req.body["_id"]) });
  }
  res.statusCode = 200;
  res.end();
};
