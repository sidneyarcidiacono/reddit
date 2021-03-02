const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')

exports.newReply = (req, res, next) => {
  // NEW Reply
  var currentUser = req.user
    let post
    Post.findById(req.params.postId).lean()
      .then(p => {
        post = p
        return Comment.findById(req.params.commentId).lean()
      })
      .then(comment => {
        console.log(`Comment from line 15 replies controller: ${comment}`)
        res.render("posts/replies-new", { post, comment, currentUser })
      })
      .catch(err => {
        console.log(err.message)
      })
}

exports.createReply = (req, res, next) => {
  // TURN REPLY INTO A COMMENT OBJECT
    const reply = new Comment(req.body)
    console.log(`Reply from line 26 replies controller: ${reply}`)
    reply.author = req.user._id
    // LOOKUP THE PARENT POST
    Post.findById(req.params.postId)
        .then(post => {
            // FIND THE CHILD COMMENT
            Promise.all([
                reply.save(),
                Comment.findById(req.params.commentId),
            ])
                .then(([reply, comment]) => {
                    // ADD THE REPLY
                    console.log(`reply line 38 in replies controller: ${reply}`)

                    console.log(`comment line 38 in replies controller: ${comment}`)
                    comment.comments.unshift(reply._id)

                    return Promise.all([
                        comment.save(),
                    ])
                })
                .then(() => {
                    res.redirect(`/posts/${req.params.postId}`)
                })
                .catch(console.error)
            // SAVE THE CHANGE TO THE PARENT DOCUMENT
            return post.save()
        })
}
