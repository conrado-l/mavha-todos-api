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
        message: 'To-do does not exist'
    },
    'TodoCreation': {
        code: 3,
        message: 'An error has occured when creating to-do'
    },
    'TodoDeletion': {
        code: 4,
        message: 'An error has occured when deleting to-do'
    },
    'TodoCreationNoDescription': {
        code: 5,
        message: 'To-do description parameter is missing'
    },
    'TodoCreationInvalidFileFormat': {
        code: 6,
        message: 'The attachment file format is not allowed'
    },
    'TodoCreationTooManyFiles': {
        code: 7,
        message: 'Only one attachment file is allowed'
    }
}
