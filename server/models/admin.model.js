const mongoose = require('mongoose')

const Admin = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
        lastname: { type: String, required: true },
		mobileno: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		quote: { type: String },
	},
	{ collection: 'admin-data' } 
)

const model = mongoose.model('AdminData', Admin)

module.exports = model