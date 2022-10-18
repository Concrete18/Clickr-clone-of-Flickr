const { sequelize } = require("../db/models");
const { Photo, User } = require("./models");

async function list(limit = 21) {
  return await Photo.findAll({
    limit: limit,
    order: sequelize.random(),
  });
}

async function findPhotosByUserId(userId, limit = 50) {
  return await Photo.findAll({
    where: { userId },
    limit: limit,
    include: User,
  });
}

async function findPhotosByPK(id) {
  return await Photo.findOne({
    where: { id },
    include: User,
  });
}

async function createPhoto(photoData) {
  newPhoto = await Photo.create(photoData);
  const newPhotoWithUser = await Photo.findOne({
    where: {
      id: Number(newPhoto.id),
    },
    include: User,
  });
  return newPhotoWithUser;
}

async function deletePhoto(photoId) {
  const photo = await Photo.findOne({
    where: { id: photoId },
  });
  photo.destroy();
}

module.exports = {
  list,
  findPhotosByPK,
  findPhotosByUserId,
  createPhoto,
  deletePhoto,
};
