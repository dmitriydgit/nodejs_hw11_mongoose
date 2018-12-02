const PostModel = require('../models/postModel');
const CommentModel = require('../models/commentModel');
const userModel = require('../models/userModel')

function getPostList(req, res) {
	PostModel.findSortedDsc(function (err, posts) { //statics
		if (err) {
			console.log(err);
			res.status(500).json({ success: false, message: 'err.massage' });
		}
		res.status(302).json(posts);
	})
};

function getPostByID(req, res) {
	var postId = req.params.postId;
	PostModel.findById(postId)
		.exec(function (err, post) {
			if (err) {
				console.log(err);
				res.status(500).json({ success: false, message: 'err.massage' });
			}
			console.log("Post found", post)
			res.status(302).json(post);
		})
};

function createPost(req, res) {
	var postText = req.body.text;
	var postPicture = req.body.picture;

	if (req.files) {
		var fileName = Date.now();
		var fileLocation = `/assets/img/${fileName}.jpeg`; //хардкодом jpg?
		var sampleFile = req.files.picture;
		sampleFile.mv('./public' + fileLocation, function (err) {
			if (err) {
				console.log(err);
				res.status(500).json({ success: false, message: err.massage });
			}
			savePost(postText, fileLocation);
			res.status(201).json({ success: true, message: "created" });
		});
	} else {
		savePost(postText, postPicture);
		res.status(201).json({ success: true, message: "created" });
	};
};


// function savePicture(picture, res){
// 	var fileName = Date.now();
// 	var fileLocation = `/assets/img/${fileName}.jpeg`; //хардкодом jpg?
// 	var sampleFile = picture;
// 		sampleFile.mv('./public' + fileLocation, function (err) {
// 			if (err) {
// 				console.log(err);
// 				res.status(500).json({ success: false, message: err.massage });
// 			}
// 		})
// 	};

function savePost(postText, postPicture) {
	var newPost = {
		author: '53cb6b9b4f4ddef1ad47f943',
		text: postText,
		picture: postPicture,
	};
	PostModel.create(newPost, function (err, post) {
		if (err) {
			console.log(err);
		} else {
			console.log('Post saved to DB', post)
		}
	});
};

function editPost(req, res) {
	var postId = req.params.postId;
	var postText = req.body.text;
	var postPicture = req.body.picture;

	if (req.files) {
		var fileName = Date.now();
		var fileLocation = `/assets/img/${fileName}.jpeg`;
		var sampleFile = req.files.picture;
		sampleFile.mv('./public' + fileLocation, function (err) {
			if (err) {
				console.log(err);
				res.status(500).json({ success: false, message: "File not saved" });
			}
			updatePost(postId, postText, fileLocation);
			console.log("File saved");
			res.status(201).json({ success: true, message: 'updated' });

		});
	} else {
		updatePost(postId, postText, postPicture);
		console.log("File saved");
		res.status(201).json({ success: true, message: 'updated' });
	};
};


function updatePost(postId, postText, postPicture) {
	var post = {
		text: postText,
		picture: postPicture,
	}

	PostModel.findByIdAndUpdate(postId, post, function (err) {
		if (err) {
			console.log(err);
		}
	});
	console.log('Post updated')
}

function deletePost(req, res) {
	var postId = req.params.postId;
	//console.log(postId)
	deletePostById(postId);
	deleteCommentsByPostId(postId);//удаляем комменты
	res.status(204).json({ success: true, message: 'deleted' });
};



function deletePostById(postId) {
	PostModel.findByIdAndRemove(postId, function (err, post) {
		if (err) {
			console.log(err);
		}
		console.log("Post deleted", post);
	})
}

function deleteCommentsByPostId(postId) {
	CommentModel.remove({ "post_id": postId }, function (err, comments) {
		if (err) {
			console.log(err);
		}
		console.log("Comments deleted", comments);
	})
}


module.exports = {
	getPostList,
	getPostByID,
	createPost,
	editPost,
	deletePost
};
