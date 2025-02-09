const Post = require("../../models/Post.model");

exports.likeGetController = async (req, res, next) => {
	let { postId } = req.params;
	let liked = null;

	if (!req.user) {
		return res.status(403).json({
			error: "You are not an authenticated user!",
		});
	}

	let userId = req.user._id;

	try {
		let post = await Post.findById(postId);
		if (post.dislikes.includes(userId)) {
			await Post.findOneAndUpdate({ _id: postId }, { $pull: { dislikes: userId } });
		}

		if (post.likes.includes(userId)) {
			await Post.findOneAndUpdate({ _id: postId }, { $pull: { likes: userId } });
			liked = false;
		} else {
			await Post.findOneAndUpdate({ _id: postId }, { $push: { likes: userId } });
			liked = true;
		}

		let updatedPost = await Post.findById(postId);
		res.status(200).json({
			liked,
			totalLikes: updatedPost.likes.length,
			totalDislikes: updatedPost.dislikes.length,
		});
	} catch (err) {
		res.status(500).json({
			error: "Server error occurred!",
		});
	}
};

exports.dislikeGetController = async (req, res, next) => {
	let { postId } = req.params;
	let disliked = null;

	if (!req.user) {
		return res.status(403).json({
			error: "You are not an authenticated user!",
		});
	}

	let userId = req.user._id;

	try {
		let post = await Post.findById(postId);

		if (post.likes.includes(userId)) {
			await Post.findOneAndUpdate({ _id: postId }, { $pull: { likes: userId } });
		}

		if (post.dislikes.includes(userId)) {
			await Post.findOneAndUpdate({ _id: postId }, { $pull: { dislikes: userId } });

			disliked = false;
		} else {
			await Post.findOneAndUpdate({ _id: postId }, { $push: { dislikes: userId } });

			disliked = true;
		}
		let updatedPost = await Post.findById(postId);
		res.status(200).json({
			disliked,
			totalLikes: updatedPost.likes.length,
			totalDislikes: updatedPost.dislikes.length,
		});
	} catch (err) {
		console.error(err);
	}
};
