module.exports = {
    filterMapping: {
        status: {
            pending: {
                TERM: 'pending',
                VALUE: 0
            },
            completed: {
                TERM: 'completed',
                VALUE: 1
            }
        }
    }
}
