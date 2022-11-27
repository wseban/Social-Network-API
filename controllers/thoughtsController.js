const { ObjectId } = require('mongoose').Types;
const { Thoughts, User } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
            .select('-__v')
            .then((thoughtData) => {
                res.json(thoughtData);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thoughtData) =>
                !thoughtData
                    ? res.status(404).json({ message: 'Could not find thought' })
                    : res.json({
                        thoughtData,
                        message: "Thought Found",
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new thought and pushed to user
    createThought(req, res) {
        Thoughts.create(req.body)
            .then(thoughtData => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$push: {thoughts: thoughtData._id}},
                    {new: true}
                );
            })
            .then(userData => {
                if(!userData){
                    return res.status(404).json({message: "User not found"})
                }
                res.json({message: "success"})
            })
            .catch((err) => res.status(500).json(err))
    },

    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            {$set: req.body},
            { runValidators: true, new: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res
                        .status(404)
                        .json({ message: 'No thought found' })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a thought by id
    deleteThought(req, res) {
        Thoughts.findOneAndRemove(
            { _id: req.params.thoughtId }
        )
            .then((thoughtData) => {
                if(!thoughtData){
                    return res.status(404).json({message: "No thought with this id"})
                }
                return User.findOneAndUpdate(
                    {thoughts: req.params.thoughtId},
                    {$pull: {thoughts: req.params.thoughtId}},
                    {new: true}
                )
            }
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create reaction
    createReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res
                        .status(404)
                        .json({ message: 'No thought found to add a reaction to' })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove reaction
    removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
        )
            .then((thoughtData) =>
                !thoughtData
                    ? res
                        .status(404)
                        .json({ message: 'No thought found to add a reaction to' })
                    : res.json(thoughtData)
            )
            .catch((err) => res.status(500).json(err));
    },
};
