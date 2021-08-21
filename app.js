// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
// const ejs = require("ejs");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));

const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

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

app.delete("/del/:id",(req,res)=>{
  var id = req.params.id
  Post.deleteOne({ _id: id},(err, result) => {
    if(err){
      throw err;
    }
    res.json(result);
  });
});

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Server started on port " + port);
});