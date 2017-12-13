module.exports = (sequelize, DataTypes) => {
  return sequelize.define('demo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'demo'
  });
};
