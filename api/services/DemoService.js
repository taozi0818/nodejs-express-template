module.exports = {
  test: () => {
    return Models.Demo.findAndCountAll();
  }
};
