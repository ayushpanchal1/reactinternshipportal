const mongoose = require('mongoose')

const Notif = new mongoose.Schema(
	{	
		email: { type: String, required: true },
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		title: { type: String, required: true },
        info: { type: String, required: true },
		link: { type: String, required: true },
		quote: { type: String },
	},
	{ collection: 'notif-data' }
)

const model = mongoose.model('NotifData', Notif)

module.exports = model