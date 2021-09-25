const { index, updateUser, userDefault } = require('../controllers/UserDetailController')

const express = require('express');
const router = express.Router();

router.get('/', userDefault)

router.get('/:name', index)

router.patch('/update/:name', updateUser)

module.exports = router;