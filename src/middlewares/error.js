/**
 * Error management
 */
module.exports = function (err, req, res, next) {
    let response = {
        success: false,
        error: {
            code: err.code || 500,
            message: err.message || 'Internal Server Error'
        }
    }
    res.status(400).json(response)
}
