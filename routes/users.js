const { index, insertUser, updateUser, deleteUser } = require('../controllers/UsersController')

const express = require('express');
const router = express.Router();

router.get('/', index)

router.post('/insert/', insertUser)

router.patch('/update/:id', updateUser)

router.delete('/delete/:id', deleteUser)

module.exports = router;