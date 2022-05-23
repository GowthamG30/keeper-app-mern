// const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { Post } = require("./database.js");
require("dotenv").config();
const port = process.env.PORT || 5000;
const path = require("path");

const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.json({
  extended: false
}));
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("/", (req, res) => {
	// res.sendFile(path.join(__dirname, "frontend", "public", "index.html"));
	res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.get("/api/all", (req, res)=>{
  Post.find({},(err, foundPosts)=>{
    res.json(foundPosts);
  });
});

app.post("/api/add", (req, res) => {
    const data = new Post({
      title:req.body.title,
      content:req.body.content
    }
    );
    data.save();
});

app.delete("/api/del/:id",(req,res)=>{
  var id = req.params.id
  Post.deleteOne({ _id: id},(err, result) => {
    if(err){
      throw err;
    }
    res.json(result);
  });
});

app.listen(port, function() {
  console.log("Server started on port " + port);
});