const Post = require('../models/post')
const User = require('../models/user')

exports.getNewPostForm = (req, res, next) => {
  return res.render('posts/new-post')
}

exports.newPost = (req, res, next) => {
  const post = new Post(req.body)
  post.author = req.user._id
  post.save()
    .then(post => {
      return User.findById(req.user._id)
    })
    .then(user => {
      user.posts.unshift(post)
      user.save()
      res.redirect(`/posts/${post._id}`)
    })
    .catch(err => {
      throw err.message
    })
}

exports.getPostDetails = (req, res, next) => {
  const currentUser = req.user._id

  Post.findById(req.params.id).populate('comments').lean()
    .then(post => {
      res.render('posts/posts-show', { post, currentUser })
    })
    .catch(err => {
      throw err.message
    })
}

exports.getBySubreddit = (req, res, next) => {
  const currentUser = req.user._id

  Post.find({ subreddit: req.params.subreddit }).lean()
    .then(posts => {
      res.render("posts/posts-index", { posts, currentUser })
    })
    .catch(err => {
      console.log(err)
    })
}
