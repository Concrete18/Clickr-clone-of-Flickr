'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

const fakeUsers = [
  {
    avatar: 'https://static.wikia.nocookie.net/nickelodeon/images/2/2c/Stock_Image_of_Doug_Dimmadome.png/revision/latest/top-crop/width/360/height/360?cb=20200323044439',
    email: 'DougD@demo.dome',
    username: 'Doug_DemoDome',
    hashedPassword: bcrypt.hashSync('password'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    avatar: 'live.staticflickr.com/7659/buddyicons/39883074@N03_r.jpg',
    email: 'michaelericson19@gmail.com',
    username: 'EricsonPhotography',
    hashedPassword: bcrypt.hashSync(faker.internet.password()),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

for (let i = 0; i <= 50; i++) {
  let newUser = {
    avatar:faker.internet.avatar(),
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
