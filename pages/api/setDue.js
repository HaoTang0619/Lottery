import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
  const { client, db } = await connectToDatabase();
  const isConnected = await client.isConnected();

  if (isConnected) {
    await db.collection("due").findOneAndReplace(
      { name: "due" },
      { name: "due", due: req.body.due },
      {
        upsert: true,
      }
    );
  }
  res.statusCode = 200;
  res.end();
};
