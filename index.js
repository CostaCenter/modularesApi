const express = require('express');
const bodyParser = require('body-parser');
const {Sequelize,  DataTypes, INTEGER } = require('sequelize');

const {db, Op } = require('./src/db/db');
const { newCategory, getCategoryById, getAllCategory, newProduct, updateProduct, getProductById, addPhoto, deletePhoto, UpdateCategory, NewSubCategory, getSubCategory, deleteProduct } = require('./src/controllers/category');

const app = express();
app.use(express.json()); 

const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Ruta de iniciacion
app.get('/', (req, res)  => {
    res.send('Running Server to modulares costa');
})


//POST
app.post('/newCategory/', newCategory);
app.post('/newSubcategory', NewSubCategory);
app.post('/newProduct', newProduct);
app.post('/addPhoto', addPhoto);
// PUT
app.put('/updateProduct/', updateProduct); 
app.put('/update/category', UpdateCategory);
// GET
// Obtenemos categoria por ID
app.get('/get/category/:categoryId', getCategoryById);
app.get('/get/subcat/:cat/:sub', getSubCategory);

//Obtenemos todas las categorias
app.get('/get/category', getAllCategory);
app.get('/get/category/:categoryId', getCategoryById);
app.get('/get/product/:productId', getProductById)
 // REMOVE
app.delete('/delete/imagen/:photoId', deletePhoto);
app.delete('/delete/product/:photo', deleteProduct)
app.delete('/delete/category/:categoryId', deleteProduct)



const server = app.listen(PORT, () => {
    db.sync();
    console.log(`Server running on port ${PORT}`);
});
 