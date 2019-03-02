/**
 * Error handling
 */
module.exports = {
    'LackingParameters': {
        code: 1,
        message: 'Some parameters are missing'
    },
    'TodoNotFound': {
        code: 2,
        message: 'Todo does not exist'
    },
    'TodoCreation': {
        code: 3,
        message: 'An error has occured when creating to-do'
    },
    'TodoDeletion': {
        code: 4,
        message: 'An error has occured when deleting to-do'
    }
}
