const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts')
const authCheck = require('../middleware/is-auth').isAuth

router.post('/new', authCheck, postController.newPost)

router.get('/new', authCheck,  postController.getNewPostForm)

router.get('/:id', authCheck, postController.getPostDetails)

module.exports = router
