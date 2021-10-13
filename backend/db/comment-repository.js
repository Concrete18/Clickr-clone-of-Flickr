const { Comment } = require("./models");

async function findCommentsByPhotoId(photoId) {
  return await Comment.findAll(
    {
      where: { photoId }
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
    }
  );
}

async function createComment(CommentData) {
  const newComment = await Comment.create(CommentData);
  return newComment;
}

async function updateComment(CommentData) {
  const newComment = await Comment.updateComment(CommentData);
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
  findCommentsByPhotoId,
  createComment,
  updateComment,
  deleteComment
};
