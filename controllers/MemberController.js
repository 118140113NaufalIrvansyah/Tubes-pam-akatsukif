const Member = require('../models/Member');

async function createMember(req, res) {
  try {
    const { name, phone, email } = req.body;
    const existsMember = await Member.findOne({ email });
    if (existsMember) {
      res.json({
        success: false,
        message: 'member already exists',
      });
    } else {
      const NewMember = new Member({
        name,
        phone,
        email,
        borrowedBooks: {
          books: [],
          schedule: '',
        },
      });
      NewMember.save()
        .then(function () {
          res.json({ success: true });
        })
        .catch(function (err) {
          res.json({
            success: false,
            message: err,
          });
        });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

async function getMember(req, res) {
  try {
    const member = await Member.find();
    if (member) {
      res.json({ success: true, member });
    } else {
      res.json({
        success: false,
        message: 'member not found',
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}
async function getMemberByid(req, res) {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ _id: id });
    if (member) {
      res.json({ success: true, member });
    } else {
      res.json({
        success: false,
        message: 'member not found',
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

async function updateMember(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, email, borrowedBooks } = req.body;
    const member = await Member.findOne({ _id: id });
    if (borrowedBooks) {
      if (member) {
        const update = await member.updateOne({
          borrowedBooks,
        });
        if (update) res.json({ success: true });
      } else {
        res.json({
          success: false,
          message: 'member not found',
        });
      }
    } else {
      if (member) {
        const update = await member.updateOne({
          name,
          phone,
          email,
        });
        if (update) res.json({ success: true });
      } else {
        res.json({
          success: false,
          message: 'member not found',
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

async function deleteMember(req, res) {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ _id: id });
    if (member) {
      const deltMember = await member.deleteOne();
      if (deltMember) res.json({ success: true });
    } else {
      res.json({
        success: false,
        message: 'member not found',
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
  createMember,
  getMember,
  getMemberByid,
  updateMember,
  deleteMember,
};
