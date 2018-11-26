const mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
	//_id: mongoose.Schema.Types.ObjectId,
	user: {
		_id: String,
		name: String,
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

