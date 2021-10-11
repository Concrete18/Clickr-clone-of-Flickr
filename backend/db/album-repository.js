const { Album } = require("./models");

async function list() {
    return await Album.findAll();
  }

  module.exports = {
    list,
  };
  