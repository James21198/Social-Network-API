const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

router.route('/').get(getThoughts);

router.route('/:userId').post(createThought);

router.route('/:thoughtId/reaction/').post(addReaction);

router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
