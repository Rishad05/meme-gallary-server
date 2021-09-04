const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const ObjectID = require('mongodb').ObjectID;
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("MemeGallary db is working fine");
});

app.listen(PORT);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j70me.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const memeImageCollection = client.db("memeGallary").collection("memeImage");

  app.post("/addMeme", (req, res) => {
    const newProduct = req.body;
    memeImageCollection.insertOne(newProduct).then((result) => {
        res.send(result.insertCount > 0);
    });
});

app.get("/allMeme", (req, res) => {
    memeImageCollection.find({}).toArray((err, documents) => {
        res.send(documents);
    });
});

      app.delete('/deleteMeme/:id', (req, res) => {
            const id = ObjectID(req.params.id)
            memeImageCollection.deleteOne({ _id: id })
             .then(result => {
              res.send(result.deletedCount > 0)
                  })
              });


              
              console.log("Successfully Running")   
    });

  


