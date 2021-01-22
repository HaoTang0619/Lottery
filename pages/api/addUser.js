import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
  const { client, db } = await connectToDatabase();
  const isConnected = await client.isConnected();

  if (isConnected) {
    res.json({
      newUser: JSON.parse(
        JSON.stringify(
          await db.collection("user").insertOne({
            icon: parseInt(req.body.icon, 10),
            name: req.body.name,
          })
        )
      ).ops[0],
    });
  } else {
    res.json({
      newUser: {
        _id: Math.random(),
        icon: req.body.icon,
        name: req.body.name,
      },
    });
  }
  res.statusCode = 200;
  res.end();
};
