const config = require("../../config/config");
const nodeEnv = config.NODE_ENV;

const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: String,
	content: String,
	noteStatus: String,
});

const Post = mongoose.model(
	nodeEnv === "test" ? "TestPost" : "Post",
	postSchema
);

module.exports = {
	Post: Post,
};
