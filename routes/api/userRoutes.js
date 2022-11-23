const router = require('express').Router();
const { getOneUser, getUsers, createUser } = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getOneUser).delete();

// /api/students/:studentId/assignments
// router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;