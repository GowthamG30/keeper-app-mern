const cors = require("cors");
const express = require("express");
const { Post } = require("./database.js");
require("dotenv").config();
const port = process.env.PORT || 5001;
const path = require("path");

const app = express();
app.use(cors());
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
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: "Internal Server Error" });
		});
});

app.post("/api/add", (req, res) => {
	if (!req.body.title || req.body.title.trim() === "") {
		return res.status(400).json({ error: "Title cannot be empty" });
	}

	if (!["To Do", "In Progress", "Done"].includes(req.body.noteStatus)) {
		return res.status(400).json({ error: "Invalid note status" });
	}

	const data = new Post({
		title: req.body.title,
		content: req.body.content,
		noteStatus: req.body.noteStatus,
	});
	data
		.save()
		.then((result) => res.status(201).json(result))
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: "Internal Server Error" });
		});
});

app.put("/api/update/:id", (req, res) => {
	var id = req.params.id;
	Post.updateOne({ _id: id }, req.body)
		.then((result) => {
			if (result.n === 0) {
				return res.status(404).json({ error: "Post not found" });
			}
			res.json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: "Internal Server Error" });
		});
});

app.delete("/api/del/:id", (req, res) => {
	var id = req.params.id;
	Post.deleteOne({ _id: id })
		.then((result) => {
			if (result.deletedCount === 0) {
				return res.status(404).json({ error: "Post not found" });
			}
			res.json(result);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: "Internal Server Error" });
		});
});

app.listen(port, () => {
	console.log("Server started on port " + port);
});
