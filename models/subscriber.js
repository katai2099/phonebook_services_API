const { sequelize, Sequelize } = require("./index");
module.exports = (sequelize, Sequelize) => {
  const Subscriber = sequelize.define(
    "subscriber",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
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
      tableName: "subscribers",
    }
  );
  return Subscriber;
};
