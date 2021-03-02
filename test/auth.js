const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require('mongoose')
const server = require('../server')

// TODO: these tests aren't working because the user we're creating isn't really being added to the database.
// Fix this and make sure that we can run these tests without fail.
// The same thing might be happening in our post tests. Fix the add post test, too

chai.config.includeStack = true

const { expect } = chai
const should = chai.should()
chai.use(chaiHttp)

const User = require("../models/user")

const SAMPLE_OBJECT_ID = 'aaaaaaaaaaaa'

after(function (done) {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe("User", function() {
  beforeEach(function (done) {
   const sampleUser = new User({
     username: 'myuser',
     password: 'mypassword',
     _id: SAMPLE_OBJECT_ID,
   })
   sampleUser.save()
     .then(() => {
       chai.request(app)
         .post('/users/sign-up')
         .send(sampleUser)
         .end((err, res) => {
           if (err) { done(err) }
           done()
       })
     })
     .catch(err => {
       throw err.message
     })
 })

   // Delete sample user.
  afterEach(function (done) {
    User.deleteMany({ username: ['myuser', 'testone'] })
      .then(() => {
        done()
      })
      .catch(err => {
        throw err.message
      })
  })

  it("should not be able to login if they have not registered", function(done) {
    chai.request(server)
      .post("/login", { username: "wrong@wrong.com", password: "nope" })
      .end(function(err, res) {
        if (err) { done(err) }
        res.status.should.be.equal(401)
        done()
    })
  })
  // signup
  it("should be able to signup", function(done) {
    let newTestUser = new User({
      username: "testone",
      password: "password",
      confirmPassword: "password"
    })
    User.findOneAndRemove({ username: "testone" }, function() {
      chai.request(server)
        .post("/sign-up")
        .send(newTestUser)
        .end(function(err, res) {
          if (err) { done(err) }
          res.should.have.status(200)
          agent.should.have.cookie("nToken")
          done()
        })
      })
  })

  it("should be able to login", function(done) {
    chai.request(server)
      .post("/login")
      .send({ username: "testone", password: "password" })
      .end(function(err, res) {
        if (err) { done(err) }
        res.should.have.status(200)
        agent.should.have.cookie("nToken")
        done()
    })
  })

  // logout
  it("should be able to logout", function(done) {
    chai.request(server)
      .get("/logout")
      .end(function(err, res) {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        agent.should.not.have.cookie("nToken")
        done()
    })
  })
})
