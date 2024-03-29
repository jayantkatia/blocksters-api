const {Sequelize} = require('sequelize')
const {DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_PORT} = process.env

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  port: DB_PORT,
  logging: false,
  query: {
    raw: true
  }
});

module.exports = db
