const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)

require('./models').sequelize.sync().then(() => app.listen(3000, () => console.log('http://localhost:3000')))