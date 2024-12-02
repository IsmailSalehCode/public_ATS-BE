const Sequelize = require("sequelize");

const db = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: "mysql",
  timezone: "+00:00",
  options: {
    host: process.env.HOST,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
      evict: 10000,
    },
  },
});

module.exports = {
  port: process.env.PORT,
  db,
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
  },
};
