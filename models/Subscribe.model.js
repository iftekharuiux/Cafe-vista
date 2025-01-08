const { Schema, model } = require("mongoose");

const subscribeSchema = new Schema(
	{
		subEmail: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Subscribe = model("Subscribe", subscribeSchema);

module.exports = Subscribe;
