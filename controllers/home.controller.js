const Checkout = require("../models/Checkout.model");
const Menu = require("../models/Menu.model");
const Post = require("../models/Post.model");
const Flash = require("../utils/Flash");
const { gettingAllOrder } = require("../utils/ordersManage");
const cloudinary = require("../utils/cloudinary");

exports.homeGetController = async (req, res, next) => {
	try {
		let menus = await Menu.find({ category: "menu" }).limit(6);
		let products = await Menu.find({ category: "product" }).limit(3);
		let coffeeMachine = await Menu.findOne({ name: "Coffee Machine" });
		let allItems = await Menu.find().limit(8).populate({
			path: "reviews.user",
			model: "User",
		});
		let blogs = await Post.find().populate("author", "username").limit(3);
		if (req.user) {
			return res.render("pages/home", {
				title: "Coffee Shop | Home",
				values: {},
				flashMessage: Flash.getMessage(req),
				errors: {},
				orders: await gettingAllOrder(req, next),
				menus,
				products,
				coffeeMachine,
				allItems,
				blogs,
			});
		}
		res.render("pages/home", {
			title: "Coffee Shop | Home",
			values: {},
			flashMessage: Flash.getMessage(req),
			errors: {},
			orders: {},
			menus,
			products,
			coffeeMachine,
			allItems,
			blogs,
		});
	} catch (err) {
		next(err);
	}
};

exports.homePostController = async (req, res, next) => {
	const { checkoutProductName, productImg, checkoutPrice, quantity, name, address, phone } =
		req.body;
	try {
		let order = new Checkout({
			user: req.user._id,
			checkoutProductName,
			productImg,
			checkoutPrice,
			quantity,
			name,
			address,
			phone: "+88" + phone,
		});

		await order.save();

		req.flash("success", "Order placed successfully");

		const [menus, products, coffeeMachine, allItems, blogs] = await Promise.all([
			Menu.find({ category: "menu" }).limit(6),
			Menu.find({ category: "products" }).limit(3),
			Menu.findOne({ name: "Coffee Machine" }),
			Menu.find().limit(8).populate({
				path: "reviews.user",
				model: "User",
			}),
			Post.find().populate("author", "username").limit(3),
		]);

		res.render("pages/home", {
			title: "Coffee Shop | Home",
			values: {},
			flashMessage: Flash.getMessage(req),
			errors: {},
			orders: await gettingAllOrder(req, next),
			menus,
			products,
			coffeeMachine,
			allItems,
			blogs,
		});
	} catch (err) {
		next(err);
	}
};
