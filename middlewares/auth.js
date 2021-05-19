const jwt = require('jsonwebtoken');
const { SecretKey } = require('../config/default.json');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const token = req.header('token');
  if (token) {
    try {
      const decoded = jwt.verify(token, SecretKey);
      req.userId = decoded;
      const user = await User.findOne({ _id: decoded.id });
      if (user) {
        next();
      } else {
        res.json({
          message: 'token is not valid',
        });
      }
    } catch (error) {
      res.json({
        message: 'token is not valid',
        error,
      });
    }
  } else {
    res.json({
      message: 'no token, authorization denied',
    });
  }
};
