const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(cors()); //middleware
app.use(express.json()); //middleware for undefined

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.irhustj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const projectsCollection = client.db("portfolio").collection("projects");
    app.get("/projects", async (req, res) => {
        const query = {};
        const cursor = projectsCollection.find(query);
        const services = await cursor.toArray();
        res.send(services);
      });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Shoriful's portfolio running");
});
app.listen(port, () => {
  console.log("listening to port", port);
});
