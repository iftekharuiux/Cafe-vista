const { Schema, model } = require("mongoose");

const reservationSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		person: {
			type: Number,
			trim: true,
			max: 100,
			required: true,
		},
		floor: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			default: "Pending",
		},
	},
	{
		timestamps: true,
	}
);

const Reservation = model("Reservation", reservationSchema);

module.exports = Reservation;
