const { Photo } = require("./models");

async function list() {
  return await Photo.findAll();
}

async function findPhotosByUserId(userId, limit=50) {
  return await Photo.findAll(
    {
      where: { userId },
      limit: limit,
    }
  );
}

async function findPhotosByPK(photoId) {
  return await Photo.findOne(
    {
      where: { photoId },
    }
  );
}

async function createPhoto(photoData) {
  const newPhoto = await photo.create(photoData);
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
