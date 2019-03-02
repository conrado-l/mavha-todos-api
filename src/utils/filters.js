module.exports = {
    /**
     * Finds the value associated with a filter term given a filter object
     * @param {object} filterObject Filter object to iterate on
     * @param {string} term Term to find
     * @return {object|null} Filter matching the term
     */
    getFilter: (filterObject, term) => {
        for (const key in filterObject) {
            if (filterObject.hasOwnProperty(key) && filterObject[key].TERM === term) {
                return filterObject[key]
            }
        }
        return null
    }
}
