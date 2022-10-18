"use strict";

const seedPhotos = require("./photos.json");

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const comments = [
  "Great photo!",
  "Awesome image!",
  "I love this!",
  "Great Shot!",
  "How did you take this?",
  "I love the contrast!",
  "Love the angle!",
  "The lighting is perfect!",
  "What lens is this?",
  "Where did you take this?",
  "What is your camera set up?",
  "I can't find your website for hiring you.",
  "This is amazing, When did you start photography?",
];

const fakeComments = [
  {
    userId: 1,
    photoId: 1,
    commentBody: "Great photo!",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

for (let i = 0; i <= 800; i++) {
  let newComment = {
    userId: getRandomNum(1, 51),
    photoId: getRandomNum(0, seedPhotos.length),
    commentBody: comments[getRandomNum(0, comments.length - 1)],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  fakeComments.push(newComment);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", fakeComments, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
