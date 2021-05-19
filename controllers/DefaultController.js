const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SecretKey } = require('../config/default.json');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({
        success: false,
        message: 'please enter all fields',
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.json({
          success: false,
          message: 'email not found',
        });
      } else {
        const compare = bcrypt.compareSync(password, user.password);
        if (compare) {
          res.json({
            success: true,
            token: jwt.sign(
              {
                id: user._id,
              },
              SecretKey,
              { expiresIn: '1d' }
            ),
            username: user.username,
          });
        } else {
          res.json({
            success: false,
            message: 'password not match',
          });
        }
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

function pageNotFound(req, res) {
  res.json({
    message: 'page not found :(',
  });
}

module.exports = {
  login,
  pageNotFound,
};
