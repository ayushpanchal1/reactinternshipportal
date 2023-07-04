const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		stuname: { type: String, required: true },
		firstname: { type: String, required: true },
        lastname: { type: String, required: true },
		academicyear: { type: String, required: true },
		mothername: { type: String, required: true },
		fathername: { type: String, required: true },
		mobileno: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		quote: { type: String },
	},
	{ collection: 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model