const express = require('express');
const asyncHandler = require('express-async-handler');

const CommentRepository = require('../../db/comment-repository');

const router = express.Router();

router.get('/photo/:id', asyncHandler(async function(req, res) {
	const comments = await CommentRepository.findCommentsByUserId(req.params.id);
	return res.json(comments);
}));

router.post('/new', asyncHandler(async function(req, res) {
	console.log('creating comment')
	const comments = await CommentRepository.createComment(req.body);
	return res.json(comments);
}));

router.put('/update/:id', asyncHandler(async function(req, res) {
	const commentId = req.params.id
	const { commentData } = req.body
	console.log('comment id', commentId)
  console.log('comment data', CommentData)
	const comments = await CommentRepository.updateComment(commentId, commentData);
	return res.json(comments);
}));

router.delete('/delete/:id', asyncHandler(async function(req, res) {
	const commentId = req.params.id
	const comments = await CommentRepository.deleteComment(commentId);
	return res.json(comments);
}));

module.exports = router;
