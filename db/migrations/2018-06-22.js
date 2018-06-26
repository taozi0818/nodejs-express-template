module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('demo', 'testColumn', {
      type: Sequelize.STRING
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('demo', 'desc');
  }
};
