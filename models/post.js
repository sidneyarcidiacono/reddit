const mongoose = require('mongoose')

const Post = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Post', Post)
