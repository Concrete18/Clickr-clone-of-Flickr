const { Comment } = require("./models");

async function list() {
    return await Comment.findAll();
  }

  module.exports = {
    list,
  };
  