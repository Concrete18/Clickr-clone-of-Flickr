const { sequelize } = require('../db/models');
const { Photo, User } = require("./models");

async function list(limit=50) {
  return await Photo.findAll({
    order: sequelize.random(),
    limit: limit
    }
  );
}

async function findPhotosByUserId(userId, limit=50) {
  return await Photo.findAll(
    {
      where: { userId },
      limit: limit,
      include: User
    }
  );
}

async function findPhotosByPK(id) {
  return await Photo.findOne(
    {
      where: { id },
      include: User
    }
  );
}

async function createPhoto(photoData) {
  const newPhoto = await Photo.create(photoData);
  return newPhoto;
}

async function deletePhoto(photoId) {
  const photo = await Photo.findOne(
    {
      where: { photoId },
    }
  );
  photo.destroy()
}

module.exports = {
  list,
  findPhotosByPK,
  findPhotosByUserId,
  createPhoto,
  deletePhoto
};
