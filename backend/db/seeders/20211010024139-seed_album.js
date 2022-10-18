"use strict";

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const albums = [
  {
    userId: 2,
    title: "My favorite Photos",
    description: "Placeholder",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const albumTitles = ["My Best Photos", "My Best Photos"];

const albumDescriptions = [
  "I took this photo for fun.",
  "I enjoyed taking this photo.",
];

for (let i = 0; i <= 300; i++) {
  let newAlbum = {
    userId: i,
    title: albumTitles[getRandomNum(0, albumTitles.length - 1)],
    description:
      albumDescriptions[getRandomNum(0, albumDescriptions.length - 1)],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  albums.push(newAlbum);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Albums", albums, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Albums", null, {});
  },
};
