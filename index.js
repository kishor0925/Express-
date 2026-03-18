const express = require('express');
const cors = require('cors');

const app = express();
const dns = require('dns');

app.use(cors());
app.use(express.json());

dns.setServers(["8.8.8.8","4.4.8.8"])

app.get('/', (req, res) => {
    res.send("Server is running");
});


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kishor250:kish123@cluster0.fwydf0q.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);


const demo = client.db("kdb").collection("kcol");

app.post("/upload" , async(req, res) => {
  const data = req.body;
  console.log(data);
  const result = await demo.insertOne(data);
  res.send(result)
})


app.get("/data", async (req, res) => {
  const result = await demo.find().toArray();
  res.send(result);
});

const PORT = 5020;
app.listen(PORT, () => {
    console.log(`Server running... hi`)
})
