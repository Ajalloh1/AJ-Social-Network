const router = require('express').Router();
//setting requirement from controller///
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

// api user: get, delete and put//
router.route('/:Id').get(getUser).put(updateUser).delete(deleteUser);

// /api/ delete, create//
// router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;