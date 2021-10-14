const express = require('express');
const asyncHandler = require('express-async-handler');

const CommentRepository = require('../../db/comment-repository');

const router = express.Router();

router.get('/photo/:id', asyncHandler(async function(req, res) {
	const comments = await CommentRepository.findCommentsByUserId(req.params.id);
	return res.json(comments);
}));

router.post('/comment/new', asyncHandler(async function(req, res) {
	const comments = await CommentRepository.createComment(req.body);
	return res.json(comments);
}));

router.post('/comment/:id', asyncHandler(async function(req, res) {
	const commentId = req.params.id
	const comments = await CommentRepository.updateComment(commentId, req.body);
	return res.json(comments);
}));

router.post('/comment/:id', asyncHandler(async function(req, res) {
	const commentId = req.params.id
	const comments = await CommentRepository.deleteComment(commentId);
	return res.json(comments);
}));

module.exports = router;
