const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('wallpaperCategory', { 
        // Nombre
        url: {
            type: DataTypes.TEXT
        },
        name: {
            type: DataTypes.STRING
        }

    })
}