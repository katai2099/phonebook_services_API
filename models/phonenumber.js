const { sequelize, Sequelize } = require("./index");
module.exports = (sequelize, Sequelize) => {
  const Phonenumber = sequelize.define(
    "phonenumbers",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phonenumber: {
        type: Sequelize.STRING,
        unique: true,
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
      tableName: "phonenumbers",
    }
  );
  return Phonenumber;
};
