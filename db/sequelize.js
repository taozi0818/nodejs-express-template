/**
 * DB config file.
 * You can config some settings about database connections in this file.
 */
let config = require('config');
let Sequelize = require('sequelize');
let env = config.util.getEnv('NODE_ENV') || 'development';
let logger = require('../util/logger')('SQL');

/**
 * '$' operation has been deprecated in high version. So you should add this in your code.
 */
let Op = Sequelize.Op;
let operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};


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
  logging: logging,
  operatorsAliases
});

// master-slave mode for DB

// let sequelize = new Sequelize(db.database, null, null, {
//   dialect: 'postgres',
//   port: '5432',
//   pool: {
//     max: 10,
//     min: 1,
//     idle: 30000
//   },
//   logging: logging,
//   replication: {
//     read: [{
//       username: 'postgres',
//       password: 'passwd',
//       host: '172.16.11.13'
//     }],
//     write: {
//       username: 'postgres',
//       password: 'passwd',
//       host: '172.16.11.12'
//     }
//   }
// });

module.exports = sequelize;
