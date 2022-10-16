const router = require('express').Router();
//setting requirement from controller///
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  postFriend,
  deleteFriend,
} = require('../../controllers/userController');
router.route('/').get(getUsers).post(postUser);

// api user: get, delete and put//
router.route('/:userId').get(getUser).put(putUser).delete(deleteUser);

// /api/ friends id//
router
  .route('/:userId/friends/:friendId')
  .post(postFriend)
  .delete(deleteFriend);

module.exports = router;
