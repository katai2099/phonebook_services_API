const { sequelize, Sequelize } = require("./index");
module.exports = (sequelize, Sequelize) => {
  const Phonebook = sequelize.define(
    "phonebooks",
    {
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
    },
    {
      tableName: "phonebooks",
    }
  );
  return Phonebook;
};
