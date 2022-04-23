"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("phonenumbers", [
      {
        phonenumber: "+36203456771",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456772",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456773",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456774",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456775",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456776",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456777",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456778",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456779",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456780",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456781",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456782",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456783",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456784",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456785",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456786",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456787",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456788",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456789",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        phonenumber: "+36203456790",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("phonenumbers", null, {});
  },
};
