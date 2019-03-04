const fs = require('fs');
const uuidv4 = require('uuid/v4');

module.exports = {
    /**
     * Generates a static file and returns the associated URL
     * @param {object} file
     * @param {string} file.name
     * @param {string} file.data
     * @param {string} file.mimetype
     * @param {string} file.md5
     * @param {boolean} file.truncated
     * @return url
     */
    generateAttachment: (file) => {
        // const uuid = uuidv4()
        // const fileExtension = file.name.split('.').pop() // Get the original file extension
        // const filename = `${file.name}.${fileExtension}`

        return new Promise((resolve, reject) => {
            fs.writeFile(`./public/attachments/${file.name}`, file.data, (err) => {
                if (err) {
                    reject(null)
                }
                resolve(`http://localhost:8080/attachments/${file.name}`) // TODO: get the path based on .env (URL + port)
            })
        })
    },

    /**
     * Deletes an attachment given a filename
     * @param {string} filename
     */
    deleteAttachment: (filename) => {
        fs.unlinkSync(`./public/attachments/${filename}`)
    }
}
