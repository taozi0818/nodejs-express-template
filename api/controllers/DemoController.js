module.exports = {
  test: async (req, res, next) => {
    try {
      let result = await Services.Demo.test();
      return res.success(result);
    } catch (e) {
      return next(e);
    }
  }
};
