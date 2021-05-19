const BookController = require('../controllers/BookController');
const DefaultController = require('../controllers/DefaultController');
const MemberController = require('../controllers/MemberController');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

const router = require('express').Router();

router.post('/user', UserController.addUser);
router.get('/user', auth, UserController.getUser);
router.get('/user/:id', auth, UserController.getUserById);
router.patch('/user/:id', auth, UserController.updateUser);
router.delete('/user/:id', auth, UserController.deleteUser);

router.post('/book', auth, BookController.createBook);
router.get('/book', auth, BookController.getBook);
router.get('/book/:id', auth, BookController.getBookById);
router.patch('/book/:id', auth, BookController.updateBook);
router.delete('/book/:id', auth, BookController.deleteBook);

router.post('/member', auth, MemberController.createMember);
router.get('/member', auth, MemberController.getMember);
router.get('/member/:id', auth, MemberController.getMemberByid);
router.patch('/member/:id', auth, MemberController.updateMember);
router.delete('/member/:id', auth, MemberController.deleteMember);

router.post('/login', DefaultController.login);

router.get('/*', DefaultController.pageNotFound);

module.exports = router;
