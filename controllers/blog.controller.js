const Flash = require("../utils/Flash");
const { gettingAllOrder } = require("../utils/ordersManage");
const Post = require("../models/Post.model");
const Profile = require("../models/Profile.model");
const cloudinary = require("../utils/cloudinary");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validatorErrorFormatter");

exports.allBlogsGetController = async (req, res, next) => {
	try {
		let blogs = await Post.find().populate("author", "username");
		res.render("pages/blogs/show-blogs", {
			title: "Coffee Shop | All Blogs",
			flashMessage: Flash.getMessage(req),
			orders: await gettingAllOrder(req, next),
			blogs,
		});
	} catch (err) {
		next(err);
	}
};

exports.createBlogGetController = async (req, res, next) => {
	res.render("pages/blogs/create-new-blog", {
		title: "Create a New Blog",
		flashMessage: Flash.getMessage(req),
		orders: await gettingAllOrder(req, next),
		errors: {},
		values: {},
	});
};

exports.createBlogPostPostController = async (req, res, next) => {
	const { title, body } = req.body;
	try {
		let result;
		if (req.file) {
			result = await cloudinary.uploader.upload(req.file.path, {
				folder: "coffeeShop",
			});
		}

		let thumbnail = result
			? result.secure_url
			: "https://res.cloudinary.com/hostingimagesservice/image/upload/v1656086428/coffeeShop/default-blog_cz7q6j.jpg";

		let errors = validationResult(req).formatWith(errorFormatter);

		if (!errors.isEmpty()) {
			return res.render("pages/blogs/create-new-blog", {
				title: "Create a New Blog",
				flashMessage: Flash.getMessage(req),
				orders: await gettingAllOrder(req, next),
				errors: errors.mapped(),
				values: req.body,
			});
		}

		let blogPost = new Post({
			title,
			body,
			author: req.user._id,
			thumbnail,
			cloudinaryId: result ? result.public_id : "",
		});

		let finalPost = await blogPost.save();

		await Profile.findOneAndUpdate(
			{ user: req.user._id },
			{
				$push: {
					posts: finalPost,
				},
			}
		);
		req.flash("success", "Post created successfully");
		res.redirect("/blog#our-blog");
	} catch (err) {
		next(err);
	}
};

exports.showSingleBlogGetController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const singleBlog = await Post.findById(id)
			.populate("author")
			.populate({
				path: "comments",
				populate: {
					path: "user",
				},
			});
		let allBookmarks = false;
		if (req.user) {
			allBookmarks = await Profile.find({ user: req.user._id });
		}
		res.render("pages/blogs/single-blog", {
			title: `Coffee Shop | ${singleBlog?.title}`,
			flashMessage: Flash.getMessage(req),
			orders: await gettingAllOrder(req, next),
			singleBlog,
			allBookmarks: allBookmarks[0],
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteSinglePostGetController = async (req, res, next) => {
	const { id } = req.params;
	const singleBlog = await Post.findById(id);
	if (String(singleBlog.author) == String(req.user._id)) {
		try {
			const deletedPost = await Post.findByIdAndDelete(id);
			let publicId = deletedPost.body;
			// need to extract the img src and public_id and should be process for deletion
			if (
				singleBlog.thumbnail !=
				"https://res.cloudinary.com/hostingimagesservice/image/upload/v1656086428/coffeeShop/default-blog_cz7q6j.jpg"
			) {
				await cloudinary.uploader.destroy(singleBlog.cloudinaryId);
				// await cloudinary.uploader.destroy(publicId);
			}
			req.flash("success", "Blog post deleted successfully");
			res.redirect("/blog#our-blog");
		} catch (err) {
			next(err);
		}
	} else {
		req.flash("fail", "You don't have permission to delete this post");
		res.redirect("/blog#our-blog");
	}
};

exports.editBlogPostGetController = async (req, res, next) => {
	const { id } = req.params;
	try {
		const singleBlog = await Post.findById(id).populate("author");
		res.render("pages/blogs/edit-blog", {
			title: `Edit - Post`,
			flashMessage: Flash.getMessage(req),
			orders: await gettingAllOrder(req, next),
			singleBlog,
			errors: {},
			values: {},
		});
	} catch (err) {
		next(err);
	}
};

exports.editBlogPostPostController = async (req, res, next) => {
	const { id } = req.params;
	const { title, body } = req.body;
	let thumbnail;
	let errors = validationResult(req).formatWith(errorFormatter);
	let singleBlog = false;
	try {
		singleBlog = await Post.findById(id).populate("author");
		let result;
		if (req.file) {
			result = await cloudinary.uploader.upload(req.file.path, {
				folder: "coffeeShop",
			});
		}
		thumbnail = result ? result.secure_url : singleBlog.thumbnail;

		if (!errors.isEmpty()) {
			req.flash("fail", "Please check your fields");
			return res.render("pages/blogs/edit-blog", {
				title: "Edit - Post",
				flashMessage: Flash.getMessage(req),
				orders: await gettingAllOrder(req, next),
				errors: errors.mapped(),
				values: req.body,
				singleBlog,
			});
		}

		await Post.findByIdAndUpdate(id, {
			title,
			body,
			thumbnail,
			cloudinaryId: result ? result.public_id : "",
		});

		if (singleBlog.thumbnail != thumbnail) {
			await cloudinary.uploader.destroy(singleBlog.cloudinaryId);
		}

		req.flash("success", "Post updated successfully");
		res.redirect(`/blog/show/${singleBlog._id}`);
	} catch (err) {
		next(err);
	}
};
