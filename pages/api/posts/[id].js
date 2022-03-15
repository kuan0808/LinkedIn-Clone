import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const {
    method,
    query: { id },
  } = req;
  if (method === "DELETE") {
    try {
      db.collection("posts").deleteOne({ _id: new ObjectId(id) }); // _id field in mongoDB is a ObjectId class
      res.status(200).json({ message: "Post deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
