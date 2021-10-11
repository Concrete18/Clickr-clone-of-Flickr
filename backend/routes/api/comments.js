const express = require('express');
const asyncHandler = require('express-async-handler');

const CommentRepository = require('../../db/comment-repository');

const router = express.Router();

router.get('/', asyncHandler(async function(_req, res) {
  const comments = await CommentRepository.list();
  return res.json(comments);
}));

module.exports = router;
