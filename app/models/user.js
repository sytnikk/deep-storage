const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let UserScheme = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: { type: Number, default: 0 }
}, { strict: false })

UserScheme.pre('save', function(next) {
	const user = this;

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(user.password, salt, function(err, hash) {
	    	user.password = hash;
	    	next();
	    });
	});

	
})

mongoose.model('User', UserScheme);

module.exports = mongoose.model('User');