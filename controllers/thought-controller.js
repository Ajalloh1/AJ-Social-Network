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
  