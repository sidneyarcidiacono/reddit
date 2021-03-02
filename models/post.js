const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Populate = require("../util/autopopulate")

const Post = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  upVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  downVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  voteScore : {type: Number},
  comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ],
  author : { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true })

// Always populate the author field
Post
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))


module.exports = mongoose.model('Post', Post)
