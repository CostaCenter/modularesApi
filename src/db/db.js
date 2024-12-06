const { Sequelize, Op} = require('sequelize');

// Importe.
const modelCategory = require('./model/category');      // Equipo - Categoria
const modelWallpaperCategory = require('./model/wallpaperPortada');      // Wallpaper categoria
const modelProduct = require('./model/product');      // Producto
const modelPhoto = require('./model/photoProduct');      // Photos


const entorno = true;

let dburl = entorno ? 'postgresql://postgres:IWBTuzBUWBIbJnoUQEOvQgCCPcZwmCXY@postgres.railway.internal:5432/railway' : 'postgres:postgres:123@localhost:5432/modulares';

const sequelize = new Sequelize(dburl, {
    logging: false,
    native: false,
});
  
 
    
// Modelos
modelCategory(sequelize);                // Categoria
modelWallpaperCategory(sequelize);       // Wallpaper Portada
modelProduct(sequelize);                 // Productos
modelPhoto(sequelize);                   // Photo

const { category, wallpaperCategory, product, media } = sequelize.models;

// Relación uno a uno - Categoria y su portada
category.hasOne(wallpaperCategory, {
    foreignKey: 'categoryId', // Clave foránea en la tabla Wallpaper
    onDelete: 'CASCADE',    // Opcional: elimina el perfil si se elimina el usuario
  });
  
wallpaperCategory.belongsTo(category);

// Relacionamos la categoria con el producto.
// Relación uno a muchos
category.hasMany(product, {
    foreignKey: 'categoryId', // Clave foránea en la tabla Post
    onDelete: 'CASCADE',    // Opcional: elimina los posts si se elimina el usuario
  });
  
product.belongsTo(category);


// Relacionamos el producto con sus fotos.
// Relación uno a muchos
product.hasMany(media, {
    foreignKey: 'productId', // Clave foránea en la tabla Post
    onDelete: 'CASCADE',    // Opcional: elimina los posts si se elimina el usuario
});
  
media.belongsTo(product);





// Exportamos.
module.exports = {
    ...sequelize.models,
    db: sequelize,
    Op
}        