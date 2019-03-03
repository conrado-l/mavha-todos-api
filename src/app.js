const express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSanitizer = require('express-sanitizer')
const todosRouter = require('./routes/todosRoute')
const basicAuth = require('./middlewares/basicAuth')
const errorHandler = require('./middlewares/error')
const paginate = require('express-paginate')
const cors = require('cors')

/**
 * Plugins & Middlewares
 */
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(expressSanitizer())
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
/**
 * Routes
 */
app.get('/', (req, res) => res.json({success: true, message: 'Welcome to MAvha Todo REST API'})) // TODO: extract message to .env file
app.use('/apidoc', basicAuth, express.static(path.join(__dirname, 'apidoc')))
app.use(paginate.middleware(10, 50));
app.use('/todo', todosRouter)
/**
 * Error handling
 */
app.use(errorHandler)
/**
 * Server initialization
 */
app.listen(8080, () => console.log('MAvha Todos REST API listening on port 8080')) // TODO: extract port to .env file
