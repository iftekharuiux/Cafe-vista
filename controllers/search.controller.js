
const Menu = require("../models/Menu.model");
const { gettingAllOrder } = require("../utils/ordersManage");

exports.searchPostController = async (req, res, next) => {
	let search = req.query.search || "";
	try {
		let searchedMenu = await Menu.find({ $text: { $search: search } });
		res.render("pages/search/search", {
			title: "Result for " + search,
			keyword: search,
			flashMessage: {},
			orders: await gettingAllOrder(req, next),
			searchedMenu,
		});
	} catch (err) {
		next(err);
	}
};
