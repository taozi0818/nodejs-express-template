/**
 * Some init functions before process starting up.
 */

let exec = require('child_process').exec;
let path = require('path');

module.exports = {
  migration: (defer) => {
    let cwd = path.resolve(__dirname, '../../');

    exec('node_modules/.bin/sequelize db:migrate', { cwd: cwd }, err => {
      if (err) {
        defer(err);
      } else {
        defer();
      }
    });
  }

};
