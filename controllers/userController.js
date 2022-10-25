const { User } = require("../models");

const userController = {
  //get all users//
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //get one//
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate([{ path: 'thoughts' }, { path: 'friends' }])
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "invalid user id." })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  ///add user//
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

//update user//

updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "There is no user with this ID." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  ///delete user//
  deleteUser(req, res) {
    User.findByIdAndDelete({ _id: req.params.userId }, {})
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "User ID doesn't exist or is invalid." })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({
          message: `Succesfully deleted User ${req.params.userId} and associated thoughts.`,
        })
      )
      .catch((err) => res.status(500).json(err));
  },
};

//add addFriend code//

//add removeFriend code

module.exports = userController;
