const config = require("./../config/config");
const mongoose = require("mongoose");
const mongoURI = config.MONGO_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected successfully");
	} catch (err) {
		console.err("Error connecting to MongoDB:", err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
