"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("subscribers", [
      {
        name: "james",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "john",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "steve",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "frank",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("subscribers", null, {});
  },
};
