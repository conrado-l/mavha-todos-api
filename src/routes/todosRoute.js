const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todosController')

/**
 * @api {get} /todo List and filter to-dos
 * @apiName ListTodo
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
 *          id: 1,
 *          status: true,
 *          attachment: "plate.jpg",
 *          description: 'Cook dinner',
 *          createdAt: "2019-03-02T09:03:38.000Z",
 *          updatedAt: "2019-03-02T22:52:40.000Z"
 *         },
 *         {
 *          id: 2,
 *          status: false,
 *          attachment: "how-to-buy-bread.pdf",
 *          description: 'Buy bread',
 *          createdAt: "2019-03-02T09:03:38.000Z",
 *          updatedAt: "2019-03-02T22:52:40.000Z"
 *         }
 *         ]
 *       }
 *     }
 */
router.get('/', todosController.list)
/**
 * @api {get} /todo/:id Get to-do
 * @apiName GetTodo
 * @apiGroup Todo
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       success: true,
 *       data: {
 *         todo: {
 *          id: 1,
 *          status: true,
 *          attachment: "plate.jpg",
 *          description: 'Cook dinner',
 *          createdAt: "2019-03-02T09:03:38.000Z",
 *          updatedAt: "2019-03-02T22:52:40.000Z"
 *         }
 *       }
 *     }
 */
router.get('/:todoId', todosController.get)
/**
 * @api {put} /todo Update to-do
 * @apiName UpdateTodo
 * @apiGroup Todo
 *  * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       success: true,
 *       data: {
 *         todo: {
 *          id: 1,
 *          status: true,
 *          attachment: "plate.jpg",
 *          description: 'Cook dinner',
 *          createdAt: "2019-03-02T09:03:38.000Z",
 *          updatedAt: "2019-03-02T22:52:40.000Z"
 *         }
 *       }
 *     }
 */
router.put('/:todoId', todosController.update)
/**
 * @api {post} /todo Create to-do
 * @apiName CreateTodo
 * @apiGroup Todo
 * @apiParam {string} description To-do's description
 * @apiParam {file} page To-do's attachment
 *  * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       success: true,
 *       data: {
 *         todo: {
 *          id: 1,
 *          status: false,
 *          attachment: "plate.jpg",
 *          description: 'Cook dinner',
 *          createdAt: "2019-03-02T09:03:38.000Z",
 *          updatedAt: "2019-03-02T22:52:40.000Z"
 *         }
 *       }
 *     }
 */
router.post('/', todosController.create)
/**
 * @api {delete} /todo/:id Delete to-do
 * @apiName DeleteToDo
 * @apiGroup Todo
 * @apiParam {number} id To-do's ID
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       success: true,
 *       data: {
 *         todo: {
 *          id: 1,
 *          status: true,
 *          attachment: "plate.jpg",
 *          description: 'Cook dinner',
 *          createdAt: "2019-03-02T09:03:38.000Z",
 *          updatedAt: "2019-03-02T22:52:40.000Z"
 *         }
 *       }
 *     }
 */
router.delete('/:todoId', todosController.get)

module.exports = router
