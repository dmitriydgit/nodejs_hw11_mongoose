const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	//_id: String,
	username: {
		type: String,
		//required: [true, 'UserName is required']
	},
	password: {
		type: String,
		//required: [true, 'Password is required']
	},
	firstName: {
		type: String,
		required: [true, 'FirstName is required']
	},
	lastName: {
		type: String,
		required: [true, 'LastName is required']
	},
	email: {
		type: String,
		//required: [true, `Email is required`],
		validate: {
			validator: function (v) {
				var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				return emailRegex.test(v);
			},
			message: `Email is not correct`
		}
	},
	avatarUrl: String

});

const User = mongoose.model(`User`, UserSchema);

module.exports = User;

