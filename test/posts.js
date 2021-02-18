const app = require("./../server")
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect

const Post = require('../models/post')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

// Agent that will keep track of our cookies
const agent = chai.request.agent(server)

it('Should create with valid attributes at POST /posts/new', function(done) {
  // Checks how many posts there are now
  Post.estimatedDocumentCount()
    .then(function (initialDocCount) {
        agent
            .post("/posts/new")
            // This line fakes a form post,
            // since we're not actually filling out a form
            .set("content-type", "application/x-www-form-urlencoded")
            // Make a request to create another
            .send({
              title: "TestPost",
              url: "http://localhost:3000",
              summary: "A test post",
              subreddit: "n/new",
              comments: [],
              author: "aaaaaaaaaaaa"
            })
            .then(function (res) {
                Post.estimatedDocumentCount()
                    .then(function (newDocCount) {
                        // Check that the database has one more post in it
                        expect(res).to.have.status(200)
                        // Check that the database has one more post in it
                        expect(newDocCount).to.be.equal(initialDocCount + 1)
                        done()
                    })
                    .catch(function (err) {
                        done(err)
                    })
            })
            .catch(function (err) {
                done(err)
            })
    })
    .catch(function (err) {
        done(err)
    })
})

after(function () {
  Post.findOneAndDelete({title: "TestPost"});
})
