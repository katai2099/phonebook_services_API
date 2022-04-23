"use strict";

const Sequelize = require("sequelize");
// const env = process.env.NODE_ENV || "development";
// const config = require(__dirname + "/../config/config.json")[env];

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.phonebook = require("./phonebook")(sequelize, Sequelize);
db.phonenumber = require("./phonenumber")(sequelize, Sequelize);
db.subscriber = require("./subscriber")(sequelize, Sequelize);
db.Op = Sequelize.Op;

// db.phonebook.hasMany(db.phonenumber, {
//   field: "phonebookId",
//   foreignKey: "phonebookId",
// });
// db.phonebook.hasMany(db.subscriber, {
//   field: "subscriberId",
//   foreignKey: "subscriberId",
// });

// db.phonenumber.belongsTo(db.phonebook);
// db.subscriber.belongsTo(db.phonebook);

db.phonenumber.hasOne(db.phonebook, { foreignKey: "id" });
db.subscriber.hasOne(db.phonebook, { foreignKey: "id" });
db.phonebook.belongsTo(db.phonenumber);
db.phonebook.belongsTo(db.subscriber);

module.exports = db;
