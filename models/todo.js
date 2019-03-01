module.exports = (sequelize) => {
    const Todo = sequelize.define('todo', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        attachment: {
            type: Sequelize.BLOB('long'),
            allowNull: true
        }
    },
    {
        freezeTableName: true
    })
};
