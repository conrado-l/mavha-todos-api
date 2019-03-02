const fs = require('fs');
const uuid = require('uuid/v4');

module.exports = {
    /**
     * Generates a static file and returns the associated URL
     * @param {buffer} file
     * @return url
     */
    generateFileWithURL(file) {
        const uuid = uuid()
        const filename = `${uuid}.extension`
        fs.writeFile(`${uuid}.extension`, file, function (err) {
            if (err) throw err;
            console.log('Saved filename');
            return filename
        })
        return null
    }
}
