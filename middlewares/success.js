/**
 *  Successful Response
 */

module.exports = (req, res, next) => {

  res.success = (data) => {
    res.json({
      success: true,
      code: 200,
      data: data
    });
  };

  next();
};
