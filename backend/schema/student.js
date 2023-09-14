const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    return sequelize.define('student', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            field: 'id',
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'name',
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'age',
        },
        major: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'major',
        },
    });
}