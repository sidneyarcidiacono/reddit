const User = require('../models/user')

exports.showUserProfile = (req, res, next) => {
  User.findById(req.params.userId).lean().populate('posts')
    .then(user => {
      return res.render('user/user-profile', { user })
    })
}
