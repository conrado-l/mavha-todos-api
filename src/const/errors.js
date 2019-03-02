/**
 * Error handling
 */
module.exports = {
    'TodoNotFound': {
        code: 1,
        message: 'The todo does not exist'
    },
    'LackingParameters': {
        code: 2,
        message: 'Some parameters are missing'
    },
    'TodoCreation': {
        code: 3,
        message: 'An error has occured when creating the todo'
    }
}
