import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
  const { client, db } = await connectToDatabase();
  const isConnected = await client.isConnected();

  if (isConnected) {
    await db.collection("winner").findOneAndReplace(
      { name: "winner" },
      { name: "winner", winner: req.body.winner },
      {
        upsert: true,
      }
    );
  }
  res.statusCode = 200;
  res.end();
};
