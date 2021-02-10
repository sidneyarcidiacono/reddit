const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.showSignup = (req, res, next) => {
  res.render('auth/sign-up')
}

exports.signup = (req, res, next) => {
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
