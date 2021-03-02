const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Populate = require("../util/autopopulate");

const Comment = new mongoose.Schema({
  content: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}] 
}, { timestamps: true })

// Always populate the author field
Comment
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))
    .pre('findOne', Populate('comments'))
    .pre('find', Populate('comments'))

module.exports = mongoose.model('Comment', Comment)
