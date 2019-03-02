const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSanitizer = require('express-sanitizer')
const todosRouter = require('./routes/todosRoute')
const basicAuth = require('./middlewares/basicAuth')
const errorHandler = require('./middlewares/error')

/**
 * Plugins & Middlewares
 */
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(expressSanitizer())
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'public')))
/**
 * Routes
 */
app.get('/', (req, res) => res.json({success: true, message: 'Welcome to MAVha Todo REST API'}))
app.use('/todo', todosRouter)
app.use('/apidoc', basicAuth, express.static(path.join(__dirname, 'apidoc')))

/**
 * Error handling
 */
app.use(errorHandler)

/**
 * Server initialization
 */
app.listen(8080, () => console.log('MAVha Todos REST API listening on port 8080'))
