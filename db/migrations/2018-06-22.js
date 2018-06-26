/**
 * Migartions for your models, name this file with date, for example 'YYYY-MM-DD'.
 * `up` includes all new migrations.
 * `down` includes all rollback.
 * This file is used as demo, create new files for your migrations.
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
    queryInterface.addColumn('demo', 'testColumn', {
      type: Sequelize.STRING
    });
    */
  },
  down: (queryInterface, Sequelize) => {
    /*
    queryInterface.removeColumn('demo', 'testColumn');
    */
  }
};
