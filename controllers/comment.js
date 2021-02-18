const Comment = require('../models/comment')
const Post = require('../models/post')

exports.newComment = (req, res, next) => {
    const comment = new Comment(req.body)
    comment.author = req.user._id
    comment
      .save()
      .then(comment => {
        return Post.findById(req.params.postId)
      })
      .then(post => {
        post.comments.unshift(comment)
        post.save()
        return res.redirect(`/posts/${post._id}`)
      })
      .catch(err => {
        console.log(err)
      })
}
