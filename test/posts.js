const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require('mongoose')
const expect = chai.expect

const Post = require('../models/post')
const User = require('../models/user')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

// Agent that will keep track of our cookies
const agent = chai.request.agent(server)

const SAMPLE_OBJECT_ID = 'aaaaaaaaaaaa'

const newPost = new Post({
  title: "testpost",
  url: "https://searx.be",
  summary: "a summary",
  author: "aaaaaaaaaaaa"
})

after(function (done) {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe("Post", function() {

  beforeEach(function (done) {
   const sampleUser = new User({
     username: 'myuser',
     password: 'mypassword',
     _id: SAMPLE_OBJECT_ID,
   })
   sampleUser.save()
     .then(function (user) {
      return newPost.save()
    })
     .then(function (post) {
       done()
     })
     .catch(function (err) {
       throw err.message
     })
 })

 afterEach(function (done) {
   User.deleteOne({ username: 'myuser' })
    .then(() => {
      return Post.deleteOne({ title: 'testpost' })
    })
    .then(() => {
      done()
    })
    .catch(err => {
      throw err.message
    })
 })

 it('Should create with valid attributes at POST /posts/new', function(done) {
  // Checks how many posts there are now
  chai.request(server)
    .post('/posts/new')
    .send({ title: 'newPost', url: 'https://url.com', summary: 'testpost', author: SAMPLE_OBJECT_ID })
    .end(function(err, res) {
      if (err) { done(err) }
      expect(res).to.have.status(200)
      done()
    })
  })
})
