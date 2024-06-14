const config = require("./config/config");
const port = config.PORT;

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const express = require("express");
const connectDB = require("./src/database.js");
const path = require("path");

const { body, validationResult } = require("express-validator");

const app = express();

// security middleware
app.use(helmet());
app.set("trust proxy", "loopback");
app.use(
	rateLimit({
		// 100 requests per 15 minutes
		windowMs: 15 * 60 * 1000,
		max: 100,
	})
);

// CORS middleware
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

// JSON parsing middleware
app.use(
	express.json({
		extended: false,
	})
);

// input validation and sanitization middleware
app.use((req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
});

// routes
const postRoutes = require("./src/route/postRoutes");
app.use("/api", postRoutes);

// database connection
connectDB()
	.then(() => {
		app.listen(port, () => {
			console.log("Server started on port " + port);
		});
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err.message);
		process.exit(1);
	});

module.exports = app;
