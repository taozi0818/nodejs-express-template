/**
 * For pagination
 */

module.exports = (req, res, next) => {
  res.pagination = (page, total, data) => {
    res.json({
      success: true,
      code: 200,
      page: page,
      total: total,
      data: data
    });
  };

  next();
};
