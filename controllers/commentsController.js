const CommentModel = require('../db/commentSchema');


function getCommentsByPostID(req, res) {
	var postId = req.params.postId;
	//console.log(commentId)
	CommentModel.find({ "post_id": postId }, function (err, comment) {
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
		user: {
			_id: '1',
			name: 'Dave',
			avatar: "/assets/img/avatar-dhg.png"
		},
		post_id: postId,
		publicationDate: Date.now(),
		text: commentText
	};
	var comment = new CommentModel(newComment);
	comment.save(function (err) {
		if (err) {
			console.log(err);
		}
	});
	console.log('Comment saved to DB')
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
	var comment = {
		text: commentText,
	}
	CommentModel.findById(commentId, function (err, foundComment) { // чекнул есть ли коммент в базе
		if (err) {
			console.log(err);
		}
		if (foundComment) {
			CommentModel.findByIdAndUpdate(commentId, comment, function (err) {
				if (err) {
					console.log(err);
				}
				console.log('Comment updated')
			});
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
