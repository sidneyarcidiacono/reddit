exports.isAuth = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    console.log("UNAUTHORIZED")
    return res.status(401) // UNAUTHORIZED
  }
}
