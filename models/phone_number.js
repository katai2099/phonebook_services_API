const { sequelize, Sequelize } = require("./index");
module.exports = (sequelize, Sequelize) => {
  const PhoneNumber = sequelize.define(
    "phone_number",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phoneNumber: {
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
      tableName: "phone_numbers",
    }
  );
  return PhoneNumber;
};
