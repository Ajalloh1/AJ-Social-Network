const router = require('express').Router();
//setting requirement from controller///
const {
  getAllThoughts,
  getThought,
  createThought,
  putThought,
  deleteThought,
  postReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');
router.route('/').get(getAllThoughts).post(createThought);

// api user: get, delete and put//
router.route('/:thoughtId').get(getThought).put(putThought).delete(deleteThought);

// /api/ friends id//
// router
//   .route('/:thoughId/reaction/')
//   .post(postReaction);

//   router
//   .route('/:thoughId/reaction/:reactionId')
//   .delete(deleteReaction);

module.exports = router;
