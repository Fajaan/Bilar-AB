var mongoose = require ('mongoose')

// Create a new mongoose schema
var Schema = new mongoose.Schema({
	SSN : {type: String,  required: true},
	fName: {type: String, required: true},
	lName: {type: String, required: true},
	address: {type: String, required: true},
	email: {type: String, required: true},
	pass: {type: String, required: true},
	title: {type: String, reuqired: true},
	vacation: [
		{type: String, required: false}
	]
});

exports.employee = mongoose.model("employee", Schema);
