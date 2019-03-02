const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todosController')

router.get('/', todosController.list)
router.get('/:todoId', todosController.get)
router.put('/:todoId', todosController.update)
router.post('/', todosController.create)

module.exports = router
