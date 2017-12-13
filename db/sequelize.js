/**
 * DB config file.
 * You can config some settings about database connections in this file.
 */
let config = require('config');
let Sequelize = require('sequelize');
let env = config.util.getEnv('NODE_ENV') || 'development';
let logger = require('../util/logger')('SQL');

// You need to defined corresponding DB config in config file (development.json/production.json)
let db = require(`../config/${env}`).db;

// Config for DB extract logs. Print log when env is development
let logging = db.logging ? (sql) => { logger.info(sql); } : false;

// Config for DB
let sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 1,
    idle: 10000
  },
  logging: logging
});

module.exports = sequelize;
