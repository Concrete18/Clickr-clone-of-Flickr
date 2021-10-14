const { Photo, User } = require("./models");

async function list() {
  return await Photo.findAll();
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
