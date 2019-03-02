const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todosController')

/**
* @api {get} /todo List todos
* @apiName TodoList
* @apiGroup Todo
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       success: true,
*       data: {
*         todos: [
*         {
*           description: 'Cook',
*          attachment: 'DNS/generated-UUID
*         },
*         {
*           description: 'Buy some bread',
*          attachment: 'DNS/generated-UUID
*         }]
*       }
*     }
*/
router.get('/', todosController.list)
/**
 * @api {get} /todo/:id Get todo
 * @apiName GetTodoById
 * @apiGroup Todo
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       success: true,
 *       data: {
 *         todo: {
 *          description: 'Cook',
 *          attachment: 'DNS/generated-UUID
 *         }
 *       }
 *     }
 */
router.get('/:todoId', todosController.get)
/**
 * @api {put} /todo Update todo
 * @apiName UpdateTodoById
 * @apiGroup Todo
 */
router.put('/:todoId', todosController.update)
/**
 * @api {post} /todo Create todo
 * @apiName CreateTodo
 * @apiGroup Todo
 */
router.post('/', todosController.create)

module.exports = router
