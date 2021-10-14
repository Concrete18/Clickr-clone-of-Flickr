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
  return newComment;
}

async function updateComment(commentId, CommentData) {
  const selectedComment = await Comment.findByPk(commentId);
  const newComment = await selectedComment.update(CommentData);
  return newComment;
}

async function deleteComment(CommentId) {
  const Comment = await Comment.findOne(
    {
      where: { CommentId },
    }
  );
  Comment.destroy()
}

module.exports = {
  findComment,
  findCommentsByUserId,
  createComment,
  updateComment,
  deleteComment
};
