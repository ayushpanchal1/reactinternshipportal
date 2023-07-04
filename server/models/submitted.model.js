const mongoose = require('mongoose')

const SubIntern = new mongoose.Schema(
	{	
		email: { type: String, required: true },
		stuname: { type: String, required: true },
		provider: { type: String, required: true },
		fromduration: { type: String, required: true },
		toduration: { type: String, required: true },
        whatfor: { type: String, required: true },
		domain: { type: String, required: true },
		quote: { type: String },
	},
	{ collection: 'submitted-data' }
)

const model = mongoose.model('SubInternData', SubIntern)

module.exports = model