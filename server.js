const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/main')
const handlebars = require('express-handlebars')

const app = express()

app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main'
}));

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
