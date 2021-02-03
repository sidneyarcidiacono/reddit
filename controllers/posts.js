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
