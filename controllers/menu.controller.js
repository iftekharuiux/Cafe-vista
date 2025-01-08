const Menu = require("../models/Menu.model");
const Flash = require("../utils/Flash");
const { gettingAllOrder } = require("../utils/ordersManage");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validatorErrorFormatter");
const cloudinary = require("../utils/cloudinary");

exports.menuGetController = async (req, res, next) => {
	try {
		let menus = await Menu.find();
		res.render("pages/menu/menu", {
			title: "Coffee Shop | Menu",
			flashMessage: Flash.getMessage(req),
			orders: await gettingAllOrder(req, next),
			menus,
		});
	} catch (err) {
		next(err);
	}
};

exports.menuAddPostController = async (req, res, next) => {
	let { addProductName, addProductPrice, category, description } = req.body;
	let onlyPrice = Number(addProductPrice).toFixed(2);
	addProductPrice = "$" + onlyPrice;

	try {
		const result = await cloudinary.uploader.upload(req.file.path, { folder: "coffeeShop" });
		let check = await Menu.find({ name: addProductName });
		if (check.length > 0) {
			req.flash("fail", "Product already exists");
			await cloudinary.uploader.destroy(result.public_id);
			return res.redirect("/menu/all");
		}
		let newMenu = new Menu({
			name: addProductName,
			image: result.secure_url,
			cloudinaryId: result.public_id,
			price: addProductPrice,
			category,
			description,
		});

		await newMenu.save();
		req.flash("success", "Product added successfully");
		res.redirect("/menu/all");
	} catch (err) {
		next(err);
	}
};

exports.singleMenuGetController = async (req, res, next) => {
	let itemId = req.params.id;
	try {
		let selectedItems = await Menu.findById(itemId).populate({
			path: "reviews.user",
			model: "User",
		});
		let relatedProduct = await Menu.find().limit(3);
		res.render("pages/menu/view-single-menu", {
			title: "View Menu",
			flashMessage: Flash.getMessage(req),
			orders: await gettingAllOrder(req, next),
			selectedItems,
			relatedProduct,
			errors: {},
		});
	} catch (err) {
		next(err);
	}
};

exports.reviewPostController = async (req, res, next) => {
	const { selectedItemsId, reviewBody, rating } = req.body;
	let errors = validationResult(req).formatWith(errorFormatter);

	try {
		if (!errors.isEmpty()) {
			let selectedItems = await Menu.findById(selectedItemsId).populate({
				path: "reviews.user",
				model: "User",
			});

			let relatedProduct = await Menu.find().limit(3);
			req.flash("fail", "Review body can not be empty");
			return res.render("pages/menu/view-single-menu", {
				title: "View Menu",
				flashMessage: Flash.getMessage(req),
				orders: await gettingAllOrder(req, next),
				selectedItems,
				relatedProduct,
				errors: errors.mapped(),
			});
		}
		await Menu.updateOne(
			{ _id: selectedItemsId },
			{
				$push: {
					reviews: {
						body: reviewBody,
						user: req.user._id,
						stars: Number(rating),
					},
				},
			}
		);
		req.flash("success", "Review added successfully");
		res.redirect(`/menu/view/${selectedItemsId}#review`);
	} catch (err) {
		next(err);
	}
};

exports.reviewDeleteGetController = async (req, res, next) => {
	const { rev, item } = req.query;
	try {
		await Menu.findOneAndUpdate(
			{ _id: item },
			{
				$pull: {
					reviews: { _id: rev },
				},
			},
			{ safe: true, multi: false }
		);
		req.flash("success", "Review deleted successfully");
		res.redirect(`/menu/view/${item}#review`);
	} catch (err) {
		next(err);
	}
};
