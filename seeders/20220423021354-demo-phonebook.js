"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let check = 1;
    for (let i = 0; i < 20; i++) {
      await queryInterface.bulkInsert("phonebooks", [
        {
          phonenumberId: i + 1,
          subscriberId: check,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      if ((i + 1) % 5 == 0) {
        check++;
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("phonebooks", null, {});
  },
};
