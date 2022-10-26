const { User, Thought } = require("../models");

const thoughtController = {

  //get all thoughts 

  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
//   / get single thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Invalid thoguht is." })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Create thoughts///
  createThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "user id is invalide." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //update thought by id

  putThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, context: 'query', new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought id is invalid." })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //delete thought //
  deleteThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Thought id doesn't exist or is invalid." })
          : res.status(200).json({
              message: `Succesfully deleted Reaction ${req.params.userId}.`,
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;