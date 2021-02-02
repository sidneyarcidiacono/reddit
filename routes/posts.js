const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts')

// Later on this needs to be changed to show all posts, instead of just the new post form
router.get('/', postController.getNewPostForm)

router.get('/new', postController.getNewPostForm)

router.post('/new', postController.newPost)

module.exports = router
