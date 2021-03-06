"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("phonebooks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phonenumberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "phonenumbers",
          key: "id",
        },
      },
      subscriberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "subscribers",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("phonebooks");
  },
};
