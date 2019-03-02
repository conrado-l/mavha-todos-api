const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todosController')

/**
* @api {get} /todo List and filter todos
* @apiName TodoList
* @apiGroup Todo
* @apiParam {string} description Filter by description
* @apiParam {string} status Filter by status
* @apiParam {string} id Filter by id
* @apiParam {number} limit Amount of todos per page
* @apiParam {number} page Page number

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
