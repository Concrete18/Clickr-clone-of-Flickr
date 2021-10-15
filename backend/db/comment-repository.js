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

async function createComment(commentData) {
  const newComment = await Comment.create(commentData);
  const selectedComment = await Comment.findByPk(newComment.id, {include: User});
  return selectedComment;
}

async function updateComment(commentId, commentData) {
  const selectedComment = await Comment.findByPk(commentId);
  await selectedComment.update({ commentBody: commentData });
  const newComment = await Comment.findByPk(commentId, { include: {model: User } })
  return newComment;
}

async function deleteComment(commentData) {
  const selectedComment = await Comment.findByPk(commentData);
  selectedComment.destroy()
}

module.exports = {
  findComment,
  findCommentsByUserId,
  createComment,
  updateComment,
  deleteComment
};
