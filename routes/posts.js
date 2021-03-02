const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts')
const authCheck = require('../middleware/is-auth').isAuth

router.post('/new', authCheck, postController.newPost)

router.get('/new', authCheck,  postController.getNewPostForm)

router.put('/:id/vote-up', authCheck, postController.upVote)

router.put('/:id/vote-down', authCheck, postController.downVote)

router.get('/:id', authCheck, postController.getPostDetails)

module.exports = router
