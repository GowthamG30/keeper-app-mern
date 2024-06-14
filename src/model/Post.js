const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: String,
	content: String,
	noteStatus: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
	Post: Post,
};
