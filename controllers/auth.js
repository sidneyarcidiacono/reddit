const User = require('../models/user')

exports.showSignup = (req, res, next) => {
  res.render('auth/sign-up')
}

exports.signup = (req, res, next) => {
  const user = new User(req.body)
  user.save()
    .then(user => {
      res.redirect('/')
    })
    .catch(err => {
      throw err.message
    })
}
