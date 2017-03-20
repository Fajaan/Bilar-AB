var mongoose = require('mongoose');

var testSchema = mongoose.Schema({
	name	: {type: String, required: false},
	//user : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });

module.exports = mongoose.model('Test', testSchema);