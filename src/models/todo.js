module.exports = (sequelize, DataTypes) => {
    return sequelize.define('todo', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: { // TODO: create a status model for handling todo status
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            attachment: { // TODO: create an attachment model and a 1:1 relation
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
}
