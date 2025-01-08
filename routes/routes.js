const homeRoute = require("./home.route");
const authRoute = require("./auth.route");
const profileRoute = require("./profile.route");
const uploadRoute = require("./upload.route");
const menuRoute = require("./menu.route");
const reservationRoute = require("./reservation.route");
const subscribeRoute = require("./subscribe.route");
const checkoutRoute = require("./checkout.route");
const dashboardRoute = require("./dashboard.route");
const blogRoute = require("./blog.route");
const searchRoute = require("./search.route");
const apiRoute = require("../api/routes/api.route")

const routes = [
	{
		path: "/",
		handler: homeRoute,
	},
	{
		path: "/api",
		handler: apiRoute,
	},
	{
		path: "/auth",
		handler: authRoute,
	},
	{
		path: "/profile",
		handler: profileRoute,
	},
	{
		path: "/menu",
		handler: menuRoute,
	},
	{
		path: "/reservation",
		handler: reservationRoute,
	},
	{
		path: "/subscribe",
		handler: subscribeRoute,
	},
	{
		path: "/checkout",
		handler: checkoutRoute,
	},
	{
		path: "/uploads",
		handler: uploadRoute,
	},
	{
		path: "/dashboard",
		handler: dashboardRoute,
	},
	{
		path: "/blog",
		handler: blogRoute,
	},
	{
		path: "/search",
		handler: searchRoute,
	}
];

/**
 * Takes in an array of routes and adds them to the app.
 * @param app - the express app to add the routes to.
 * @returns None
 */
module.exports = (app) => {
	routes.forEach((route) => {
		app.use(route.path, route.handler);
		// route.path == "/" ? app.get(route.path, route.handler) : app.use(route.path, route.handler);
	});
};
