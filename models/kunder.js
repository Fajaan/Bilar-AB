var mongoose = require ('mongoose')

// Create a new mongoose schema
var Schema = new mongoose.Schema({
	SSN : {type: String, required: true},
	fName: {type: String, required: true},
	lName: {type: String, required: true},
	address: {type: String, required: true},
	email: {type: String, required: true}
});

exports.customer = mongoose.model("customer", Schema);
