module.exports = (sequelize, DataTypes) => {
    let Todo = sequelize.define('todo', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            attachment: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            createdAt: {
                field: 'created_at',
                type: DataTypes.DATE,
            },
            updatedAt: {
                field: 'updated_at',
                type: DataTypes.DATE,
            },
        },
        {
            freezeTableName: true
        })

    return Todo
}
