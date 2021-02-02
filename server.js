const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const ejs = require('ejs')

const routes = require('./routes/main')
const postRoutes = require('./routes/posts')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))
// Dani - I'm using a newer version of express-validator & you don't need to call use() like you used to :)
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)
app.use('/posts', postRoutes)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
