const bcrypt = require('bcrypt');
const User = require('../models/User');

async function addUser(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.json({
        success: false,
        message: 'please enter all fields',
      });
    } else {
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.json({
          success: false,
          message: 'user already exists',
        });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const NewUser = new User({
          username,
          email,
          password,
        });
        NewUser.password = hash;
        NewUser.save()
          .then(function () {
            res.json({ success: true });
          })
          .catch(function () {
            res.json({ success: false });
          });
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.find();
    if (user.length < 1) {
      res.json({
        success: false,
        message: 'User not found',
      });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.json({
        success: false,
        message: 'user not found',
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.userId;
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.json({
        success: false,
        message: 'please enter all fields',
      });
    } else {
      const user = await User.findById(req.params.id);
      if (user) {
        if (user._id == id) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
          const update = await user.updateOne({
            username: username,
            email: email,
            password: hash,
          });
          if (update) res.json({ success: true });
        } else {
          res.json({
            success: false,
            message: 'you have no access',
          });
        }
      } else {
        res.json({
          success: false,
          message: 'user not found',
        });
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.userId;
    const user = await User.findById(req.params.id);
    if (user) {
      if (user._id == id) {
        const remove = await user.remove();
        if (remove) res.json({ success: true });
      } else {
        res.json({
          success: false,
          message: 'you have no access',
        });
      }
    } else {
      res.json({
        success: false,
        message: 'user not found',
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

module.exports = {
  addUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};
