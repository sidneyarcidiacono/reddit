const Comment = require('../models/comment')
const Post = require('../models/post')

exports.newComment = (req, res, next) => {
  // CREATE Comment
  const comment = new Comment(req.body)
  comment.author = req.user._id
  comment
    .save()
    .then(comment => {
        return Promise.all([
            Post.findById(req.params.postId)
        ])
    })
    .then(([post, user]) => {
        post.comments.unshift(comment)
        return Promise.all([
            post.save()
        ])
    })
    .then(post => {
        res.redirect(`/posts/${req.params.postId}`)
    })
    .catch(err => {
        console.log(err)
    })
}
