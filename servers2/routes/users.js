const express = require('express')

const router = express.Router();
const {
  getAllUsers,
  getUsersID,
  createUsers,
  updateUsers,
  deleteUsers,
  loginUsers
} = require('../controllers/users')

router.route('/').get(getAllUsers).post(createUsers).delete(deleteUsers)

router.route('/login').post(loginUsers)

router.route('/:id').get(getUsersID).put(updateUsers)

module.exports = router;