const { Photo } = require("./models");

async function list() {
  return await Photo.findAll();
}

async function findPhotosByUserId(id) {
  return await Photo.findAll(
    {
      where: { userId:id }
    }
  );
}

module.exports = {
  list,
  findPhotosByUserId,
};
