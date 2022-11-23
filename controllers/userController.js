const { User, Thoughts } = require("../models");

module.exports = {
    // Get all students
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
    // Get a single student
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
    // create a new student
    createUser(req, res) {
      User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    // Delete a student and remove them from the course
    deleteStudent(req, res) {
      Student.findOneAndRemove({ _id: req.params.studentId })
        .then((student) =>
          !student
            ? res.status(404).json({ message: 'No such student exists' })
            : Course.findOneAndUpdate(
                { students: req.params.studentId },
                { $pull: { students: req.params.studentId } },
                { new: true }
              )
        )
        .then((course) =>
          !course
            ? res.status(404).json({
                message: 'Student deleted, but no courses found',
              })
            : res.json({ message: 'Student successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Add an assignment to a student
    addAssignment(req, res) {
      console.log('You are adding an assignment');
      console.log(req.body);
      Student.findOneAndUpdate(
        { _id: req.params.studentId },
        { $addToSet: { assignments: req.body } },
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
  