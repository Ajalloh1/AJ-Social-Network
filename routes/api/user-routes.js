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
router.route('/:id').get(getUsers).post(postUser);

// api user: get, delete and put//
router.route('/:Id').get(getUser).put(putUser).delete(deleteUser);

// /api/ delete, create//
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;