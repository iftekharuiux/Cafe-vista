const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// creating a google oAuth2 for secured mail sending
const OAuth2 = google.auth.OAuth2;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken, {
	lazyLoading: true,
});

// gmail notification system with nodemailer
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const refreshToken = process.env.REFRESH_TOKEN;
const oAuth2_client = new OAuth2(clientId, clientSecret);
oAuth2_client.setCredentials({ refresh_token: refreshToken });

exports.sendNotification = async (msgBody, toNum, toMail) => {
	try {
		// mobile messages system with twilio
		await client.messages.create({
			body: msgBody,
			from: "+12606328062",
			to: toNum,
		});

		// gmail notification system with nodemailer
		accessToken = oAuth2_client.getAccessToken();
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: process.env.USER,
				pass: process.env.EMAIL_PASS,
				clientId,
				clientSecret,
				refreshToken,
				accessToken,
			},
		});

		const mailOptions = {
			from: `CAFE Coffee Shop <${process.env.USER}>`,
			to: toMail,
			subject: "About checkout",
			text: msgBody,
		};
		await transporter.sendMail(mailOptions);
		transporter.close();
		
	} catch (err) {
		console.error(err);
	}
};
