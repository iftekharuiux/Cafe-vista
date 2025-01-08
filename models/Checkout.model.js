const { model, Schema } = require("mongoose");

const checkoutSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		checkoutProductName: {
			type: String,
			required: true,
		},
		productImg: {
			type: String,
			required: true,
		},
		// cloudinaryId: {
		// 	type: String,
		// 	required: true,
		// },
		checkoutPrice: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "accepted", "rejected"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

const Checkout = model("Checkout", checkoutSchema);

module.exports = Checkout;
