require('dotenv').config()
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')

const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const routes = require('./routes/main')
const postRoutes = require('./routes/posts')
const subredditRoutes = require('./routes/subreddit')
const commentRoutes = require('./routes/comment')
const authRoutes = require('./routes/auth')

const app = express()

app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, '/views/layouts/'),
  partialsDir: path.join(__dirname, '/views/partials/'),
  extname: 'hbs',
  defaultLayout: 'main'
}))

app.use(cookieParser())

app.use(bodyParser.urlencoded({extended: false}))
// Dani - I'm using a newer version of express-validator & you don't need to call use() like you used to :)
app.use(express.static(path.join(__dirname, 'public')))

const checkAuth = (req, res, next) => {
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null
  } else {
    const token = req.cookies.nToken
    const decodedToken = jwt.decode(token, { complete: true }) || {}
    req.user = decodedToken.payload
  }

  next()
}
app.use(checkAuth)

app.use(routes)
app.use('/posts', postRoutes)
app.use('/n', subredditRoutes)
app.use(commentRoutes)
app.use(authRoutes)


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('CONNECTED')
    app.listen(3000)
  })
  .catch(err => {
    throw err.message
  })

// mongoose.set('debug', true)

module.exports = app
