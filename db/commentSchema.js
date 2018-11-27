const mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
	// user: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: `User`
	// },
	user: {
		_id: String,
		firstName: String,
		lastName: String,
		avatar: String,
		//required: true
	},
	post_id: mongoose.Schema.Types.ObjectId,
	publicationDate: {
		type: Date,
	},
	text: {
		type: String,
		required: true
	}
	//picture: String,
});

const Comments = mongoose.model(`Comment`, CommentSchema);

module.exports = Comments;

