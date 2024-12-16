const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    sequelize.define('subcategory', { 
        // Nombre
        title: {
            type: DataTypes.STRING
        },
        state: { // Proceso, Perdido, Ganado
            type: DataTypes.STRING
        }

    }) 
}