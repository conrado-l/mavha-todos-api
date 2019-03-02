const models = require('../models/index')
const errors = require('../const/errors')
const fileManager = require('../services/fileManager')
module.exports = {
    /**
     * List all the todos
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
     */
    create: async (req, res, next) => { // Validate fields
        if (!req.body.description) {
            return next(errors.LackingParameters)
        }

        const description = req.sanitize(req.body.description) // Sanitize to avoid XSS attacks
        const files = req.files
        let newTodo = {description}
        let persistedFilename

        if (Object.keys(files).length === 1) { // If there is a file (just one), upload it
            persistedFilename = await fileManager.generateAttachment(files.file)

            if (!persistedFilename) { // Error when trying to persist the file
                return next(errors.TodoCreation)
            }

            newTodo.attachment = persistedFilename
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
                fileManager.deleteAttachment(persistedFilename)
                return next(errors.TodoCreation)
            })
    }
}
