const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


// Connect to database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uv0p6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connect to database
async function run() {
    try {
        // connect to services data
        await client.connect();
        const serviceCollection = client.db('doctors_portal').collection('services');

        // get data from database
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
    }
    finally {
        
    }
}

run().catch(console.dir);


// Root API
app.get("/", (req, res) => {
  res.send("Hello from doctors portal!");
});


// App listener
app.listen(port, () => {
  console.log(`Doctors app listening on port ${port}`);
});