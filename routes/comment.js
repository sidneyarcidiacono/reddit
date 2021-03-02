const express = require('express')
const router = express.Router()

const commentController = require('../controllers/comment')
const repliesController = require('../controllers/replies')

router.post('/posts/:postId/comments', commentController.newComment)

router.post('/posts/:postId/comments/:commentId/replies', repliesController.createReply)

router.get('/posts/:postId/comments/:commentId/replies/new', repliesController.newReply)

module.exports = router
