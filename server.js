const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

app.get("/all", (req, res)=>{
  Post.find({},(err, foundPosts)=>{
    res.json(foundPosts);
  });
});

app.post("/add", (req, res) => {
    const data = new Post({
      title:req.body.title,
      content:req.body.content
    }
    );
    data.save();
});

app.delete("/del/:id", (req,res)=>{
  var id = req.params.id
  Post.deleteOne({ _id: id}, (err, result) => {
    if(err){
      throw err;
    }
    res.json(result);
  });
});


app.listen(port, function() {
  console.log("Server started on port " + port);
});