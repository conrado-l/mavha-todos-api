'use strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('todo', {
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
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                createdAt: {
                    field: 'created_at',
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    field: 'updated_at',
                    type: Sequelize.DATE,
                },
            }
        )
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('todo')
    }
}
