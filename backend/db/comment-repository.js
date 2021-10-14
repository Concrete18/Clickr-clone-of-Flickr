const { Comment, User } = require("./models");

async function findCommentsByUserId(photoId) {
  return await Comment.findAll(
    {
      where: { photoId },
      include: User
    }
  );
}

async function findComment(userId, photoId) {
  return await Comment.findOne(
    {
      where: { 
        userId,
        photoId
       },
       include: User
    }
  );
}

async function createComment(CommentData) {
  const newComment = await Comment.create(CommentData);
  const selectedComment = await Comment.findByPk(newComment.id, {include: User});
  return selectedComment;
}

async function updateComment(commentId, CommentData) {
  const selectedComment = await Comment.findByPk(commentId);
  console.log('comment id', commentId)
  console.log('comment data', CommentData)
  const newComment = await selectedComment.update(CommentData);
  return newComment;
}

async function deleteComment(CommentId) {
  const selectedComment = await Comment.findByPk(CommentId);
  selectedComment.destroy()
}

module.exports = {
  findComment,
  findCommentsByUserId,
  createComment,
  updateComment,
  deleteComment
};
