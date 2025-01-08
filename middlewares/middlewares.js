const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { bindUserWithRequest } = require("../middlewares/auth.middleware");
const setLocals = require("../middlewares/setLocals.middleware");

const { MONGODB_CONNECTION_URI } = process.env;

const store = new MongoDBStore({
	uri: MONGODB_CONNECTION_URI,
	collection: "sessions",
});
// Catch errors
store.on("error", function (error) {
	console.error(error);
});

const middlewares = [
	express.static("public"),
	express.urlencoded({ extended: true }),
	express.json(),
	session({
		secret: "my-secret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 12, // 12 hours
		},
		store: store,
	}),
	flash(),
	bindUserWithRequest(),
	setLocals(),
];

module.exports = (app) => {
	middlewares.forEach((middleware) => {
		app.use(middleware);
	});
};
