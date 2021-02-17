const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.showSignup = (req, res, next) => {
  res.render('auth/sign-up')
}

exports.showLogin = (req, res, next) => {
  res.render('auth/log-in')
}

exports.signup = (req, res, next) => {
  if (req.body.confirmPassword != req.body.password) {
    throw new Error("Passwords do not match.")
  }
  const user = new User(req.body)
  user.save()
    .then(user => {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: "60 days" })
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
      res.redirect('/')
    })
    .catch(err => {
      console.log(err.message)
      res.status(400).send({ err: err })
    })
}

exports.login = (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  // Find this user name
  User.findOne({ username }, "username password")
    .then(user => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: "Wrong Username or Password" })
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong Username or password" })
        }
        // Create a token
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
          expiresIn: "60 days"
        })
        // Set a cookie and redirect to root
        res.cookie("nToken", token, { maxAge: 900000, httpOnly: true })
        res.redirect("/")
      })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.logout = (req, res, next) => {
  res.clearCookie('nToken')
  res.redirect('/')
}
