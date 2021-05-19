const { Schema, model } = require('mongoose');

const MemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  borrowedBooks: {
    books: [],
    schedule: {
      type: String,
    },
  },
  registerAt: {
    type: Date,
    default: Date.now,
  },
});

const Member = model('member', MemberSchema);

module.exports = Member;
