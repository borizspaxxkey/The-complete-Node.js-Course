module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);

    } catch (ex) {
      next(ex);
    }
  };
}
//Alternate way to handle errors