var mongoose = require('mongoose');
module.exports = class DbConnection {
	constructor(db) {
		this.connectToMongo(db);
	}
	connectToMongo(db) {
		mongoose.connect('mongodb://127.0.0.1:27017/'+db);
		this.db = mongoose.connection;
		this.db.on('error', console.error.bind(console, '\x1b[31m' + 'DB connection error' + "\x1b[0m"));
		this.db.once('open', () => {
			console.log('Connected to DB ' + "\x1b[32m" + this.db.name + "\x1b[0m");
		});
	}
	
}

