const Comment = require('../models/comment')
const Post = require('../models/post')

exports.newComment = (req, res, next) => {
    const comment = new Comment(req.body)
    comment
      .save()
      .then(comment => {
        // REDIRECT TO THE ROOT
        return Post.findById(req.params.postId)
      })
      .then(post => {
        post.comments.unshift(comment)
        return post.save()
      })
      .then(post => {
        res.redirect('/')
      })
      .catch(err => {
        console.log(err)
      })
}
