const { User, Thoughts } = require("../models");

module.exports = {
    // Get all users
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((userData) => {
                res.json(userData);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get a one user by id and populated thought and friend data
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        userData,
                        message: "User Found",
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { runValidators: true, new: true }
        )
            .then((userData) =>
                !userData
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID' })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a user by id
    deleteUser(req, res) {
        User.findOneAndRemove(
            { _id: req.params.userId },
            { runValidators: true, new: true }
        )
            .then((userData) =>
                !userData
                    ? res
                        .status(404)
                        .json({ message: 'No user found with that ID' })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Add a friend to a user
    addFriend(req, res) {
        console.log('You are adding a friend to this user');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((userData) =>
                !userData
                    ? res
                        .status(404)
                        .json({ message: 'No user found to add a friend to' })
                    : res.json(userData)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove assignment from a student
    removeAssignment(req, res) {
        Student.findOneAndUpdate(
            { _id: req.params.studentId },
            { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
            { runValidators: true, new: true }
        )
            .then((student) =>
                !student
                    ? res
                        .status(404)
                        .json({ message: 'No student found with that ID :(' })
                    : res.json(student)
            )
            .catch((err) => res.status(500).json(err));
    },
};
