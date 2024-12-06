const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('category', { 
        // Nombre
        title: {
            type: DataTypes.STRING
        },
        // Phone
        smallDescription:{
            type: DataTypes.STRING
        },
        // Email
        bigTitle:{
            type: DataTypes.STRING
        },
        // Sector
        bigDescription: {
            type: DataTypes.STRING
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