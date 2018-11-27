const mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
	// author: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: `User`
	// },
	author: {
		_id: String,
		firstName: String,
		lastName: String,
		avatar: String,
		//required: true
	},
	publicationDate: {
		type: Date,
	},
	text: {
		type: String,
		required: true
	},
	picture: String,
});

PostSchema.statics.findSortedDsc = function (cb) {
	this.find()
		.sort({ publicationDate: -1 })
		.exec(cb)
}



const Post = mongoose.model(`Post`, PostSchema);

module.exports = Post;

