const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  available: {
    type: Number,
    default: 0,
  },
});

const Book = model('book', BookSchema);

module.exports = Book;
