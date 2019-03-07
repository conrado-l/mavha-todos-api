const models = require('../models/index')
const errors = require('../const/errors')
const {generateAttachment, deleteAttachment, checkMimetype} = require('../services/fileManager')
const filterConstants = require('../const/todo')
const filterUtils = require('../utils/filters')
const paginate = require('express-paginate')
const mimetypes = require('../const/mimetypes')

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
     * Toggle todo status based on the ID
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
        const description = req.sanitize(req.body.description)

        // Description is empty
        if (!description.trim().length) {
            return next(errors.TodoCreationNoDescription)
        }

        const files = req.files
        let newTodo = {description}
        let persistedFilename

        // Check for a single file
        if (files && Object.keys(files).length === 1) {
            const file = files.file
            const validMimetype = checkMimetype(file.mimetype, [
                mimetypes.TEXT,
                mimetypes.CSV,
                mimetypes.DOC,
                mimetypes.DOCX,
                mimetypes.IMAGE,
                mimetypes.PDF,
                mimetypes.GIF,
                mimetypes.JPEG,
                mimetypes.PNG,
                mimetypes.WEBP,
                mimetypes.PPT,
                mimetypes.PPTX
            ])

            // The file's mimetype is not valid/allowed
            if (!validMimetype) {
                return next(errors.TodoCreationInvalidFileFormat)
            }

            // Persist the attachment file and get the filename
            persistedFilename = await generateAttachment(file)

            // Error when trying to persist the file
            if (!persistedFilename) {
                return next(errors.TodoCreation)
            }

            // Save the attachment URL in the new to-do
            newTodo.attachment = persistedFilename
        } else if (files && Object.keys(files).length > 1) {
            return next(errors.TodoCreationTooManyFiles)
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
                deleteAttachment(persistedFilename)
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
