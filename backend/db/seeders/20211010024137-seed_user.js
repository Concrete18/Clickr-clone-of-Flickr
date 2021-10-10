'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

const fakeUsers = [
  {
    email: 'DougD@demo.dome',
    username: 'Doug_DemoDome',
    hashedPassword: bcrypt.hashSync('password'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'michaelericson19@gmail.com',
    username: 'EricsonPhotography',
    hashedPassword: bcrypt.hashSync(faker.internet.password()),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

for (let i = 0; i <= 300; i++) {
  let newUser = {
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
