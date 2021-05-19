const Book = require('../models/Book');

async function createBook(req, res) {
  try {
    const { title, isbn, author, publisher, available } = req.body;
    if (!title || !isbn || !author || !publisher || !available) {
      res.json({
        success: false,
        message: 'please enter all fields',
      });
    } else {
      const bookExists = await Book.findOne({ isbn });
      if (bookExists) {
        res.json({
          success: false,
          message: 'book already exists',
        });
      } else {
        const NewBook = new Book({
          title,
          isbn,
          author,
          publisher,
          available,
        });
        NewBook.save()
          .then(function () {
            res.json({ success: true });
          })
          .catch(function (err) {
            res.json({ success: false, message: err });
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

async function getBook(req, res) {
  try {
    const book = await Book.find();
    if (book) {
      res.json({ success: true, book });
    } else {
      res.json({
        success: false,
        message: 'book not found',
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

async function getBookById(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ _id: id });
    if (book) {
      res.json(book);
    } else {
      res.json({
        success: false,
        message: 'book not found',
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

async function updateBook(req, res) {
  try {
    const { title, isbn, author, publisher, available } = req.body;
    const { id } = req.params;
    if (!title || !isbn || !author || !publisher) {
      const book = await Book.findOne({ _id: id });
      if (book) {
        const update = await book.updateOne({
          available,
        });
        if (update) res.json({ success: true });
      } else {
        res.json({
          success: false,
          message: 'book not found',
        });
      }
    } else {
      const book = await Book.findOne({ _id: id });
      if (book) {
        const update = await book.updateOne({
          title,
          isbn,
          author,
          publisher,
          available,
        });
        if (update) res.json({ success: true });
      } else {
        res.json({
          success: false,
          message: 'book not found',
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

async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ _id: id });
    if (book) {
      const deletebook = await book.deleteOne();
      if (deletebook) res.json({ success: true });
    } else {
      res.json({
        success: false,
        message: 'book not found',
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
  createBook,
  getBook,
  getBookById,
  updateBook,
  deleteBook,
};
