const express = require('express')
const router = express.Router()

const userController = require('../controllers/auth')

// Render sign up form
router.get('/sign-up', userController.showSignup)

router.post('/sign-up', userController.signup)

router.get('/logout', userController.logout)

module.exports = router
