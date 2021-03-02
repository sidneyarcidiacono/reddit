const app = require('./../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const server = require('../server')
const agent = chai.request.agent(app)

const Post = require('../models/post')
const User = require('../models/user')

chai.should()
chai.use(chaiHttp)

describe('Posts', function () {
  const agent = chai.request.agent(server)
  const newPost = {
    title: 'post title',
    url: 'https://www.google.com',
    summary: 'post summary',
    subreddit: 'test'
  }
  const user = {
    username: 'poststest',
    password: 'testposts',
    confirmPassword: 'testposts'
  }

  before(function (done) {
    agent.post(
      '/sign-up'
    ).set(
      'content-type', 'application/x-www-form-urlencoded'
    ).send(
      user
    ).then(function (res) {
      done()
    }).catch(function (err) {
      done(err)
    })
  })

  it('Should create with valid attributes at POST /posts/new', function (done) {
    Post.estimatedDocumentCount().then(function (initialDocCount) {
      agent.post(
        '/posts/new'
      ).set(
        'content-type', 'application/x-www-form-urlencoded'
      ).send(
        newPost
      ).then(function (res) {
        Post.estimatedDocumentCount().then(function (newDocCount) {
          expect(res).to.have.status(200)
          expect(newDocCount).to.be.equal(initialDocCount + 1)
          done()
        }).catch(function (err) {
          done(err)
        })
      }).catch(function (err) {
        done(err)
      })
    }).catch(function (err) {
      done(err)
    })
  })

  after(function (done) {
    Post.findOneAndDelete(
      newPost
    ).then(function (res) {
      agent.close()
      User.findOneAndDelete({
        username: user.username
      }).then(function (res) {
        done()
      }).catch(function (err) {
        done(err)
      })
    }).catch(function (err) {
      done(err)
    })
  })
})
