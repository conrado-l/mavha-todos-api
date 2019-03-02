const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSanitizer = require('express-sanitizer')
const todosRouter = require('./routes/todosRoute')
const errorHandler = require('./middlewares/error')

/**
 * Plugins
 */
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(expressSanitizer())
app.use(fileUpload())
/**
 * Routes
 */
app.use('/todo', todosRouter)
app.get('/', (req, res) => res.json({success: true, message: 'Welcome to MAVha Todos REST API'}))
/**
 * Error handling
 */
app.use(errorHandler)

/**
 * Server initialization
 */
app.listen(8080, () => console.log('MAVha Todos REST API listening on port 8080'))
