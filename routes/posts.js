const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts')

router.post('/new', postController.newPost)

router.get('/new', postController.getNewPostForm)

router.get('/:id', postController.getPostDetails)

module.exports = router
