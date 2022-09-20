"use strict";
const { v4 } = require("uuid");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const users = [
  {
    id: v4(),
    username: "neniEmSu",
    email: "neniemsu@mail.com",
    scope: "admin",
    password: "abc123",
  },
  {
    id: v4(),
    username: "johnDoe",
    email: "johndoe@mail.com",
    scope: "user",
    password: "bbc123",
  },
  {
    id: v4(),
    username: "janeDoe",
    email: "janedoe@mail.com",
    scope: "user",
    password: "cbc123",
  },
];

const hashPassword = (password) => bcrypt.hashSync(password, saltRounds);

const  finalUsers = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      scope: user.scope,
      password: hashPassword(user.password),
    };
  });

console.log(finalUsers)

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", finalUsers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
