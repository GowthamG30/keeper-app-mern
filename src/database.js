const config = require("./../config/config");
const mongoose = require("mongoose");
const mongoURI = config.MONGO_URI;

const connectDB = () => {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(mongoURI)
			.then(() => {
				console.log("MongoDB connected successfully");
				resolve();
			})
			.catch((err) => {
				console.error("Error connecting to MongoDB:", err.message);
				reject(err);
			});
	});
};

module.exports = connectDB;
