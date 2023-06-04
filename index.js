const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000 ;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@jigsaw1270.6chjsjt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    

    await client.connect();
    // Send a ping to confirm a successful connection
    const menucollection = client.db("bristroDB").collection("menuCollection");
    const reviews = client.db("bristroDB").collection("reviews");
    const cartCollection = client.db("bristroDB").collection("carts");

    app.get('/menuCollection', async(req , res) =>{
      const result = await menucollection.find().toArray();
      res.send(result);
      console.log(result);
    })
    app.get('/reviews', async(req , res) =>{
      const result = await reviews.find().toArray();
      res.send(result);
      console.log(result);
    })


    app.post('/carts', async(req,res)=>{
      const item = req.body;
      console.log(item);
      const result = await cartCollection.insertOne(item);
      res.send(result);
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res) => {
    res.send('boss is sitting')
})


app.listen(port,() =>{
    console.log(`Bistro boss is sitting on port${port}`);
})