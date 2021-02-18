const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.get('/:userId', userController.showUserProfile)

module.exports = router
