const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts')

router.get('/:subreddit', postController.getBySubreddit)

module.exports = router
