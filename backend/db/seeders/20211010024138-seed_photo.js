'use strict';

const seedPhotos = require('./photos.json');

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

const photoDescriptions = [
  'I took this photo for fun.',
  'I enjoyed taking this photo.',
  'I took this during the weekend.',
  'I took this photo for fun.',
  'I took this photo for fun.',
  'I took this photo for fun.',
  'I took this photo for fun.',
  'I took this photo for fun.',
  'I took this photo for fun.',
]

const photos = []

// my profile seeder
for (let i = 0; i == seedPhotos.length; i++) {
  let newPhoto = {
    albumId: 1,
    title: seedPhotos[i].title,
    description: photoDescriptions[getRandomNum(0, photoDescriptions.length-1)],
    createdAt: new Date(),
    updatedAt: new Date()
  }
  photos.push(newPhoto);
};

// other profiles seeder
for (let i = 0; i <= 300; i++) {
  let newPhoto = {
    albumId: 1,
    title: seedPhotos[getRandomNum(0, seedPhotos.length-1)].title,
    description: photoDescriptions[getRandomNum(0, photoDescriptions.length-1)],
    imgUrl: seedPhotos[getRandomNum(0, seedPhotos.length)].imageUrl,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  photos.push(newPhoto);
};

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Photos', photos, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Photos', null, {});
  }
};
