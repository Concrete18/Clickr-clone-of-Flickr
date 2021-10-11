const { Photo } = require("./models");

async function list() {
    return await Photo.findAll();
  }

  module.exports = {
    list,
  };
  