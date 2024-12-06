const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('media', { 
        // Nombre
        url: {
            type: DataTypes.TEXT
        },
        // Phone
        title:{
            type: DataTypes.STRING
        },
       
        state: { // Proceso, Perdido, Ganado
            type: DataTypes.STRING
        }

    })
}