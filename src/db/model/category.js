const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('category', { 
        // Nombre
        title: {
            type: DataTypes.STRING
        },
        // Phone
        smallDescription:{
            type: DataTypes.TEXT
        },
        // Email
        bigTitle:{
            type: DataTypes.STRING
        },
        // Sector
        bigDescription: {
            type: DataTypes.TEXT
        },
        // Wallpaper
        wallpaper:{
            type: DataTypes.TEXT
        },
        // state
        state: { // Proceso, Perdido, Ganado
            type: DataTypes.STRING
        }

    }) 
}