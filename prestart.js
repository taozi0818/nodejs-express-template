/**
 * This file will execute before project startup.
 * It's due to call something business related
 * conveniently and reduce codes for reference.
 */

global.Controllers = {};
global.Models = {};
global.Services = {};

let _ = require('lodash');
let path = require('path');
let glob = require('glob');
let controllerFiles = glob.sync(path.resolve(`./api/controllers/**.js`));
let serviceFiles = glob.sync(path.resolve(`./api/services/**.js`));
let modelFiles = glob.sync(path.resolve(`./api/models/**.js`));
let sequelize = require('./db/sequelize');

module.exports = () => {
  let categories = [
    {
      type: 'Models',
      files: modelFiles,
      basename: '.js'
    }, {
      type: 'Controllers',
      files: controllerFiles,
      basename: 'Controller.js'
    }, {
      type: 'Services',
      files: serviceFiles,
      basename: 'Service.js'
    }
  ];

  categories.map((category) => {
    if (category.type !== 'Models') {
      category.files.map(file => {
        global[category.type][path.basename(file, category.basename)] = require(file);
      });
    } else {
      category.files.map(file => {
        global[category.type][path.basename(file, category.basename)] = sequelize.import(file);
      });
    }
  });

  _.map(Models, (value, key) => {
    if ('associate' in value) {
      Models[key].associate(Models);
    }
  });
};
