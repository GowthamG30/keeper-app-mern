const config = require("./config/config");
const port = config.PORT;

const cors = require("cors");
const express = require("express");
const connectDB = require("./src/database.js");
const path = require("path");

const app = express();

// middleware
app.use(cors());
app.use(
	express.json({
		extended: false,
	})
);

// routes
const postRoutes = require("./src/route/postRoutes");
app.use("/api", postRoutes);

// // app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "frontend", "build")));
// app.get("/", (req, res) => {
// 	// res.sendFile(path.join(__dirname, "frontend", "public", "index.html"));
// 	res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });

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
