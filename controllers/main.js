const Post = require('../models/post')

exports.index = (req, res, next) => {
  const currentUser = req.user

  Post.find({})
    .then(posts => {
      res.render("posts/posts-index", { posts, currentUser })
    })
    .catch(err => {
      console.log(err.message)
    })
}
