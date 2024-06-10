// const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { Post } = require("./database.js");
require("dotenv").config();
const port = process.env.PORT || 5001;
const path = require("path");

const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(
	express.json({
		extended: false,
	})
);
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("/", (req, res) => {
	// res.sendFile(path.join(__dirname, "frontend", "public", "index.html"));
	res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.get("/api/all", (req, res) => {
	Post.find({})
		.then((foundPosts) => res.json(foundPosts))
		.catch((err) => console.log(err));
});

app.post("/api/add", (req, res) => {
	const data = new Post({
		title: req.body.title,
		content: req.body.content,
		noteStatus: req.body.noteStatus,
	});
	data.save()
		.then((result) => res.json(result))
		.catch((err) => console.log(err));
});

app.put("/api/updateStatus/:id", (req, res) => {
	var id = req.params.id;
	var status = req.body.noteStatus;
	Post.updateOne({ _id: id }, { noteStatus: status })
		.then((result) => res.json(result))
		.catch((err) => console.log(err));
});

app.delete("/api/del/:id", (req, res) => {
	var id = req.params.id;
	Post.deleteOne({ _id: id })
		.then((result) => res.json(result))
		.catch((err) => console.log(err));
});

app.listen(port, function () {
	console.log("Server started on port " + port);
});
