module.exports = function (req, res, next) {
  // authorization middleware sets req.user
  if (!req.user.isAdmin) return res.status(403).send('Access Denied');

  next();
}