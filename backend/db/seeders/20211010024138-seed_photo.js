"use strict";

const seedPhotos = require("./photos.json");

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const photoDescriptions = [
  "I took this photo for fun over the weekend.",
  "I enjoyed taking this photo.",
  "I took this during the weekend.",
  "I took this photo for fun.",
  "I wish I had time to take more of these photos.",
  "I did not expect this one to turn out so well!",
  "This was fun and I hope to take more photos like it soon!",
  "I have been wanting to take a photo like this for weeks since I saw one like by someone else on here.",
];

const photos = [];

// profiles seeder
for (let i = 0; i < seedPhotos.length; i++) {
  let newPhoto = {
    userId: getRandomNum(1, 51),
    albumId: i,
    title: seedPhotos[i].title,
    description:
      photoDescriptions[getRandomNum(0, photoDescriptions.length - 1)],
    imgUrl: seedPhotos[i].imageUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  photos.push(newPhoto);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Photos", photos, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Photos", null, {});
  },
};
