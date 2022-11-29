const { Sequelize } = require("sequelize");
console.log("initial database...");
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    timezone: "+07:00",
  }
);
console.log('initialized database...OK')
module.exports = sequelize;
