const CommentModel = require('../models/commentModel');


function getCommentsByPostID(req, res) {
	var postId = req.params.postId;
	CommentModel.findCommentAndPopulateUser(postId, function (err, comment) {
		if (err) {
			console.log(err);
			res.status(500).json({ success: false, message: 'err.massage' });
		}
		res.json(comment);
	})
};

function createComment(req, res) {
	var commentText = req.body.text;
	var postId = req.body.postId;
	saveComment(commentText, postId);
	res.status(201).json({ success: true, message: "created" });
};

function saveComment(commentText, postId) {
	var newComment = {
		user: "53cb6b9b4f4ddef1ad47f943",
		post_id: postId,
		publicationDate: Date.now(),
		text: commentText
	};
	CommentModel.create(newComment, function (err, comment) {
		if (err) {
			console.log(err);
		}
		console.log('Comment saved to DB', comment)
	});
}

function getCommentByID(req, res) {
	var commentId = req.params.commentId;
	CommentModel.findById(commentId, function (err, comment) {
		if (err) {
			console.log(err);
			res.status(500).json({ success: false, message: 'err.massage' });
		};
		res.json(comment);
	});
};

function editComment(req, res) {
	var commentId = req.body._id;
	var commentText = req.body.text;
	updateComment(commentId, commentText);
	res.status(201).json({ success: true, message: 'updated' });
};

function updateComment(commentId, commentText) {
	CommentModel.findById(commentId, function (err, foundComment) { // чекнул есть ли коммент в базе
		if (err) {
			console.log(err);
		}

		if (foundComment) {
			foundComment.text = commentText;
			foundComment.save(function (err) {
				if (err) {
					console.log(err);
				}
				console.log('Comment saved to DB')
			})

		}
	});
}

function deleteComment(req, res) {
	var commentId = req.params.commentId;
	console.log(commentId)
	deleteCommentById(commentId);
	res.status(204).json({ success: true, message: 'deleted' });
}

function deleteCommentById(commentId) {
	CommentModel.findByIdAndRemove(commentId, function (err, comment) {
		if (err) {
			console.log(err);
		}
		console.log("Comment deleted");
	})
}


module.exports = {
	getCommentsByPostID,
	getCommentByID,
	createComment,
	editComment,
	deleteComment
};
