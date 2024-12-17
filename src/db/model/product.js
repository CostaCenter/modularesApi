const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('product', { 
        // Nombre
        name: {
            type: DataTypes.STRING
        },
        // Phone
        referencia:{
            type: DataTypes.STRING
        },
        // Email
        description:{
            type: DataTypes.TEXT
        },
        // Sector
        photo: {
            type: DataTypes.TEXT
        },
       
        state: { // Proceso, Perdido, Ganado
            type: DataTypes.STRING
        }

    })
}