const models = require('../models/index')
const errors = require('../const/errors')
const fileManager = require('../services/fileManager')
const filterConstants = require('../const/todo')
const filterUtils = require('../utils/filters')
const paginate = require('express-paginate')

module.exports = {
    /**
     * List and filter todos
     */
    list: (req, res, next) => { // TODO: Improve field validation
        try {
            // Applied to Sequelize's query
            let filters = {}

            // Filter by status
            if (req.query.status) {
                // Get the status filter
                let statusFilter = filterUtils.getFilter(filterConstants.filterMapping.status, req.query.status)

                // If the filter is valid, use it
                if (statusFilter) {
                    filters.status = statusFilter.VALUE
                }
            }

            // Filter by ID
            if (req.query.id) {
                filters.id = Number.parseInt(req.query.id)
            }

            // Filter by description
            if (req.query.description) {
                filters.description = {
                    $like: `%${req.query.description}%`
                }
            }

            // Apply the filters, query the DB, setup the pagination settings and create a response
            models.todo.findAndCountAll({
                limit: req.query.limit,
                offset: req.skip,
                order: [['createdAt', 'DESC']],
                where: {...filters}
            }).then(results => {
                // Pagination settings
                const itemCount = results.count;
                const pageCount = Math.ceil(results.count / req.query.limit)

                // Create a response
                res.json({
                    success: true,
                    data: {
                        todos: results.rows,
                        pageCount,
                        itemCount,
                        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
                    }
                })
            })

        } catch (e) {
            next(e)
        }
    },

    /**
     * Get a todo based on the ID
     */
    get: async (req, res, next) => {
        // Check for the id parameter
        if (!req.params.todoId) {
            return next(errors.LackingParameters)
        }
        try {
            const todo = await models.todo.findOne({
                where: {
                    id: req.params.todoId
                }
            })

            // Todo was not found
            if (!todo) {
                return next(errors.TodoNotFound)
            }

            // Create a response
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
     * Update todo status to done based on the ID
     */
    update: async (req, res, next) => {
        // Check for the id parameter
        if (!req.params.todoId) {
            return next(errors.LackingParameters)
        }

        try {
            // Find todo
            let todo = await models.todo.findOne({where: {id: req.params.todoId}})

            // Todo was not found
            if (!todo) {
                return next(errors.TodoNotFound)
            }

            // Update todo
            await todo.update(
                {
                    status: !todo.status
                },
                {
                    where: {
                        id: req.params.todoId
                    }
                })

            // Create a response
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
     * Create a new todo
     */
    create: async (req, res, next) => { // TODO: Validate fields
        // Check for the description parameter
        if (!req.body.description) {
            return next(errors.LackingParameters)
        }

        // Sanitize description to avoid XSS attacks
        const description = req.sanitize(req.body.description) // TODO: trim string and return error if empty
        const files = req.files // TODO: check for file mime-type
        let newTodo = {description}
        let persistedFilename

        // If there is a file (just one), try to upload it
        if (files && Object.keys(files).length === 1) { // TODO: add error for handling multiple files
            persistedFilename = await fileManager.generateAttachment(files.file)

            // Error when trying to persist the file
            if (!persistedFilename) {
                return next(errors.TodoCreation)
            }

            // Save the attachment URL
            newTodo.attachment = persistedFilename
        }

        models.todo.create(newTodo)
            .then(todo => {
                // Create a response
                res.json({
                    success: true,
                    data: {
                        todo: todo
                    }
                })
            })
            .catch(() => {
                // Delete the attachment file - TODO: improve by using Sequelize's creation hooks and commit/rollback
                fileManager.deleteAttachment(persistedFilename)
                return next(errors.TodoCreation)
            })
    },

    /**
     * Delete todo based on the ID
     */
    delete: async (req, res, next) => {
        // Check for the id parameter
        if (!req.params.todoId) {
            return next(errors.LackingParameters)
        }

        try {
            // Find todo
            let todo = await models.todo.findOne({where: {id: req.params.todoId}})

            // Todo was not found
            if (!todo) {
                return next(errors.TodoNotFound)
            }

            // Delete todo
            todo.destroy()
                .then((deletedTodo) => {
                    res.json({
                        success: true,
                        data: {
                            deletedTodo
                        }
                    })
                })
                .catch((err) => {

                })

            // Create a response
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

}
