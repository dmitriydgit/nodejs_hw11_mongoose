const PostModel = require('../db/postSchema');
const CommentModel = require('../db/commentSchema');
const commentsController = require('../controllers/commentsController')

function getPostList(req, res) {
	PostModel.find(
		{},
		'',
		{
			sort: {
				publicationDate: -1
			}
		},
		function (err, posts) {
			if (err) {
				console.log(err);
				res.status(500).json({ success: false, message: 'err.massage' });
			}
			res.json(posts);
		})
};

function getPostByID(req, res) {
	var postId = req.params.postId;
	console.log(postId)
	PostModel.findById(postId, function (err, post) {
		if (err) {
			console.log(err);
			res.status(500).json({ success: false, message: 'err.massage' });
		}
		res.json(post);
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
			console.log("File saved");
			savePost(postText, fileLocation);
			res.status(201).json({ success: true, message: "created" });
		});
	} else {
		savePost(postText, postPicture);
		res.status(201).json({ success: true, message: "created" });
	};
};



function savePost(postText, postPicture) {
	var newPost = {
		author: {
			_id: '1',
			name: 'Dave',
			avatar: "/assets/img/avatar-dhg.png"
		},
		publicationDate: Date.now(),
		text: postText,
		picture: postPicture,
	};

	var post = new PostModel(newPost);
	post.save(function (err) {
		if (err) {
			console.log(err);
		}
	});
	console.log('Post saved to DB')
}

function editPost(req, res) {
	var postId = req.params.postId;
	var postText = req.body.text;
	var postPicture = req.body.picture;
	console.log(req.body, postId)

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
	deleteCommentsByPostId(postId);
	res.status(302).json({ success: true, message: 'deleted' });
};



function deletePostById(postId) {
	PostModel.findByIdAndRemove(postId, function (err, post) {
		if (err) {
			console.log(err);
		}
		console.log("Post deleted");
	})

}

function deleteCommentsByPostId(postId) {
	CommentModel.remove({ "post_id": postId }, function (err, comment) {
		if (err) {
			console.log(err);
		}
		console.log("Comments deleted");
	})
}


module.exports = {
	getPostList,
	getPostByID,
	createPost,
	editPost,
	deletePost
};
