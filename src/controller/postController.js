const { Post } = require("../model/Post.js");

exports.getAllPosts = (req, res) => {
	Post.find({})
		.then((foundPosts) => res.json(foundPosts))
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: "Internal Server Error" });
		});
};

exports.addPost = (req, res) => {
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
			console.error(err);
			res.status(500).json({ error: "Internal Server Error" });
		});
};

exports.updatePost = (req, res) => {
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
};

exports.deletePost = (req, res) => {
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
};
