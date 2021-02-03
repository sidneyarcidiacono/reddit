const Post = require('../models/post')

exports.getNewPostForm = (req, res, next) => {
  return res.render('posts/new-post')
}

exports.newPost = (req, res, next) => {
  const post = new Post(req.body)
  post.save()
    .then(result => {
      return res.redirect('/')
    })
    .catch(err => {
      throw err.message
    })
}

exports.getPostDetails = (req, res, next) => {
  Post.findById(req.params.id).lean()
    .then(post => {
      res.render('posts/posts-show', { post })
    })
    .catch(err => {
      throw err.message
    })
}
