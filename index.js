const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const setRoutes = require("./routes/routes");
const middlewares = require("./middlewares/middlewares");

/**
 * Sets the view engine to ejs and sets the views directory.
 * @returns None
 */
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/**
 * The main function that runs the server.
 * @returns None
 */
const { MONGODB_CONNECTION_URI } = process.env;
const PORT = process.env.PORT || 5000;

// <=======< Set all routes and middlewares >=======> //
/**
 * Sets up the routes for the application.
 * @param app - The express app to set up the routes for.
 * @returns None
 */

middlewares(app);
setRoutes(app);

// health check
app.get("/health", (req, res) => {
	res.status(200).json({ success: true, message: "Server is healthy" });
});

/**
 * Handles errors that are thrown by the application.
 * @param error - The error that was thrown.
 * @param req - The request that was made.
 * @param res - The response that was sent.
 * @param next - The next function to call.
 */
app.use((req, res, next) => {
	let error = new Error("404 page not found");
	error.status = 404;
	next(error);
});

/**
 * Handles errors that occur in the application.
 * @param error - The error that occurred.
 * @param req - The request that caused the error.
 * @param res - The response that caused the error.
 * @param next - The next middleware in the chain.
 * @returns None
 */
app.use((error, req, res, next) => {
	console.error(error);
	if (error.status === 404) {
		console.info(req.url);
		return res.render("pages/error/404", {
			title: "404 page not found",
		});
	}
	res.render("pages/error/500", {
		title: "server error",
	});
});

// <=======< connects with the database >=======> //
/**
 * Connect to the MongoDB database.
 * @returns None
 */
mongoose
	.connect(MONGODB_CONNECTION_URI)
	.then(() => {
		console.info("Connected to the Database");
		app.listen(PORT, () => {
			console.log(`App running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
