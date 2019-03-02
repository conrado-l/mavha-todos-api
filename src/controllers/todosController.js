const models = require('../models/index')
const errors = require('../const/errors')
const fileGenerator = require('../services/staticFileGenerator')
module.exports = {
    /**
     * List all the todos
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    list: async (req, res, next) => {
        try {
            const todos = await models.todo.findAll()

            res.json({
                success: true,
                data: todos
            })
        } catch (e) {
            next(e)
        }
    },

    /**
     * Get a todo based on the ID
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    get: async (req, res, next) => {
        if (!req.params.todoId) {
            return next(errors.LackingParameters)
        }
        try {
            const todo = await models.todo.findOne({
                where: {
                    id: req.params.todoId
                }
            })

            if (!todo) return next(errors.TodoNotFound)

            res.json({
                success: true,
                data: {
                    todo
                }
            })
        } catch (e) {
            next(e)
        }
    },

    /**
     * Update the todo status to done based on the ID
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    update: async (req, res, next) => {
        if (!req.params.todoId) {
            return next(errors.LackingParameters)
        }

        try {
            let todo = await models.todo.update({
                status: true
            }, {where: {id: req.params.todoId}})

            if (!todo) return next(errors.TodoNotFound)

            res.json({
                success: true,
                data: {
                    todo
                }
            })
        } catch (e) {
            next(e)
        }
    },

    /**
     * Creates a new todo
     * @param req
     * @param res
     * @param next
     * @returns {Promise<*>}
     */
    create: async (req, res, next) => { // Validate fields
        if (!req.body.description) {
            return next(errors.LackingParameters)
        }

        const description = req.sanitize(req.body.description) // Sanitize to avoid XSS attacks
        const newTodo = { description }
        const files = req.files
        let persistedFilename = ''

        if (Object.keys(files).length === 1) { // If there is a file (just one), upload it
            persistedFilename = fileGenerator()
            if (!persistedFilename) {
                return next(errors.TodoCreation)
            }
            newTodo.attachment = files.file
        }

        models.todo.create(newTodo)
            .then(todo => {
                res.json({
                    success: true,
                    data: {
                        todo: todo
                    }
                })
            })
            .catch(() => {
                return next(errors.TodoCreation)
            })
    }
}
