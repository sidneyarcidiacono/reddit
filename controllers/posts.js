const Post = require('../models/post')
const User = require('../models/user')

exports.getNewPostForm = (req, res, next) => {
  return res.render('posts/new-post')
}

exports.newPost = (req, res, next) => {
  // CREATE new post
  const post = new Post(req.body)
  post.upVotes = []
  post.downVotes = []
  post.voteScore = 0
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

exports.upVote = (req, res, next) => {
  // Up vote a post
  console.log(`req.params.id from upvote: ${req.params.id}`)
  Post.findById(req.params.id).exec(function(err, post) {
    post.upVotes.push(req.user._id)
    post.voteScore = post.voteScore + 1
    post.save()

    res.status(200)
  });
}

exports.downVote = (req, res, next) => {
  // Down vote a post
  Post.findById(req.params.id).exec(function(err, post) {
    post.downVotes.push(req.user._id)
    post.voteScore = post.voteScore - 1
    post.save()

    res.status(200)
  })
}

exports.getPostDetails = (req, res, next) => {
  // SHOW post
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
  // SHOW post by subreddit
  const currentUser = req.user._id

  Post.find({ subreddit: req.params.subreddit }).lean()
    .then(posts => {
      res.render("posts/posts-index", { posts, currentUser })
    })
    .catch(err => {
      console.log(err)
    })
}
