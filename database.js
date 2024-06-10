const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
	title: String,
	content: String,
	noteStatus: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
	Post: Post,
};
