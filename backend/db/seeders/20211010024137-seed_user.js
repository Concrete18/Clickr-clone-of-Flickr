'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');
const seedAvatars = require('./avatars.json');

function* avatarGenerator() {
  let i = 0
  while (true) {
    yield seedAvatars[i]
    if (i > seedAvatars.length-2) i = 0;
    else i++;
  }
}

const fakeUsers = [
  {
    avatar: 'https://static.wikia.nocookie.net/nickelodeon/images/2/2c/Stock_Image_of_Doug_Dimmadome.png/revision/latest/top-crop/width/360/height/360?cb=20200323044439',
    email: 'DougD@demo.dome',
    username: 'Doug_DemoDome',
    hashedPassword: bcrypt.hashSync('password'),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const gen = avatarGenerator()
for (let i = 0; i <= 50; i++) {
  let newUser = {
    avatar:gen.next().value,
    username: faker.internet.userName(),
    email:faker.internet.email(),
    hashedPassword:bcrypt.hashSync(`sadPassword&${i}`, 10),
    createdAt: new Date(),
    updatedAt: new Date()
  }
  fakeUsers.push(newUser);
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
