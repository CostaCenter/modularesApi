const express = require('express');
const { category, product, media, subcategory } = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rounds = process.env.AUTH_ROUNDS || 10;
const secrete = process.env.AUTH_SECRET || 'WithGod';
const expires = process.env.AUTH_EXPIRES || "30d";

module.exports = {
         // Eliminar producto
         async deleteCategory(req, res){
            try{ 
                // Recibimos datos por params
                const { categoryId } = req.params;
                // Validamos la entrada del parametro
                if(!categoryId) return res.status(501).json({msg: 'Parametro invalido.'});
                // Caso contrario, avanzamos
                const deleteDestroy = await category.destroy({
                    where: {
                        id: categoryId
                    }
                }).catch(err => {
                    console.log(err)
                });
                // Validamos la eliminacion
                if(!deleteDestroy) return res.status(502).json({msg: 'Delete'});
                // Caso contrario
                res.status(200).json({msg: 'Eliminado con exito'});
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
            }
        },
        // Eliminar producto
        async deleteProduct(req, res){
            try{ 
                // Recibimos datos por params
                const { productId } = req.params;
                // Validamos la entrada del parametro
                if(!productId) return res.status(501).json({msg: 'Parametro invalido.'});
                // Caso contrario, avanzamos
                const deleteDestroy = await product.destroy({
                    where: {
                        id: productId
                    }
                }).catch(err => {
                    console.log(err)
                });
                // Validamos la eliminacion
                if(!deleteDestroy) return res.status(502).json({msg: 'Delete'});
                // Caso contrario
                res.status(200).json({msg: 'Eliminado con exito'});
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
            }
        },
        // Remover photo
        async deletePhoto(req, res){
            try{
                // Recibimos datos por params
                const { photoId } = req.params;
                // Validamos la entrada del parametro
                if(!photoId) return res.status(501).json({msg: 'Parametro invalido.'});
                // Caso contrario, avanzamos
                const deleteDestroy = await media.destroy({
                    where: {
                        id: photoId
                    }
                }).catch(err => {
                    console.log(err)
                });
                // Validamos la eliminacion
                if(!deleteDestroy) return res.status(502).json({msg: 'Delete'});
                // Caso contrario
                res.status(200).json({msg: 'Eliminado con exito'});
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
            }
        },
        // Agregar foto al producto
        async addPhoto(req, res){
            try{
                // Recibimos datos por body
                const { url, title, productId } = req.body;
                // Validamos parametros
                if(!url || !title || !productId) return res.status(501).json({msg: 'Parametros invalidos'});
                // Caso contrario, avanzamos

                const addPhoto = await media.create({
                    url,
                    title,
                    state:'active',
                    productId
                })
                .then(async (res) => {
                    const searchPr = await product.findByPk(productId, {
                        include: [{
                            model: media
                        }]
                    }).catch(err => {
                        console.log(err);
                        return null;
                    })

                    return searchPr
                })
                .catch(err => {
                    console.log(err);
                    return null
                });
                // Validamos la creacion
                if(!addPhoto) return res.status(502).json({msg: 'No hemos logrado anexar esta imagen al producto.'});
                // Caso contrario
                res.status(201).json(addPhoto);
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
            }
        },
        // Nuevo producto
        async newProduct(req,res){
            try{
                // Recibimos datos por body
                const { name, referencia, description, photo, categoryId, subcategoryId } = req.body;
                // Validamos los parametros
                if(!name || !referencia || !description || !photo || !categoryId || !subcategoryId) return res.status(501).json({msg: 'Los parametros no son validos'});
                // Caso contrario, avanzamos
                
                const createProduct = await product.create({
                    name,
                    referencia,
                    description,
                    photo,
                    categoryId,
                    subcategoryId,
                    state: 'Active'
                }).catch(err => {
                    console.log(err);
                    return null;
                });
                // Verificamos si se creo o no el producto
                if(!createProduct) return res.status(502).json({msg: 'No hemos podido crear esto.'});
                // Caso contrario, mostramos la creacion
                res.status(201).json(createProduct)
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal.'});
            }
        },
        // Actualizar producto
        async updateProduct(req, res){
            try{
                // Recibimos parametros por body
                const { productId, name, referencia, description, photo, state } = req.body;
                // Validamos los parametros por body
                if(!productId || !name || !referencia || !description || !photo) return res.status(501).json({msg: 'Parametros invalidos'});
                // Caso contrario, avanzamos
                const updatePr = await product.update({
                    name,
                    referencia,
                    description,
                    photo
                },
                {
                    where: {
                        id: productId
                    }
                }).catch(err => {
                    console.log(err);
                    return null;
                });
                // Validamos updateRD
                if(!updatePr) return res.status(502).json({msg: 'No hemos podido actualizar esto.'});
                // Caso contrario, mensaje de exito
                res.status(200).json({msg: 'Actualizado con exito.'});
            }catch(err){
                console.log(err);
                return res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
            }
        },
        // Obtenemos producto por ID
        async getProductById(req, res){
            try{   
                // Obtenemos id por params.
                const { productId } = req.params;
                // Valiamos que entre el parametro
                if(!productId) return res.status(501).json({msg: 'Parametro invalido'});
                // Caso contrario, avanzamos
                const searchProduct = await product.findOne({
                    where: {
                        id:productId,
                    },
                    include:[{
                        model: media
                    },{
                        model: category,
                        include:[{
                            model: product
                        }]
                    }]
                }).catch(err => {
                    console.log(err);
                    return null;
                });
                // Verificamos si hay error en la creacion
                if(!searchProduct) return res.status(404).json({msg: 'No hemos encontrado este producto'});
                // Caso conteario, enviamos respuesta
                res.status(200).json(searchProduct);
            }catch(err){
                console.log(err);
                return null;
            }
        },
        async getAllProductByCategory(req, res){
            try{
                // Recibimos id por params
                const { categoryId } = req.params;
                // Validamos que entre correctamente el id
                if(!categoryId) return res.status(501).json({msg: 'Parametro invalido'});
                // Caso contrario, avanzamos
                const searchProductos = await category.findOne({
                    where: {
                        name: categoryId,
                        state: 'active'
                    },
                    include:[{
                        model:product,
                        where: {
                            state: 'active'
                        },
                        include:[{
                            model: media
                        }]
                    }]
                }).catch(err => {
                    console.log(err);
                    return null;
                });
                // verificamos si hay resultados
                if(!searchProductos) return res.status(404).json({msg: 'No hemos encontrado resultado'});
                // Caso contrario, enviamos resultados
                res.status(200).json(searchProductos)
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal.'});
            }
        },
        // Crear categoria
        async newCategory(req, res){
            try{
                // Recibimos los datos por body
                const { title, smallDescription, bigTitle, bigDescription, wallpaper } = req.body;
                // Validamos los parametros
                if(!title || !smallDescription || !bigTitle || !bigDescription || !wallpaper) return res.status(501).json({msg: 'Los parametros no son validos.'});
                // Caso contrario, avanzamos
                const createCategory = await category.create({ 
                    title,
                    smallDescription,
                    bigTitle,
                    bigDescription,
                    wallpaper,
                    state: 'active'
                }).catch(err => {
                    console.log(err);
                    return null;
                });
                // Verificamos si se creo correctamente
                if(!createCategory) return res.status(502).json({msg:'No hemos podido crear esto. '});
                // Caso contrario, mostramos la creacion
                res.status(201).json(createCategory);
 
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal.'});
            }
        },
        // Editar categoria
        async UpdateCategory(req, res){
            try{
                // Recibimos los datos por body
                const { categoryId, title, smallDescription, bigTitle, bigDescription, wallpaper } = req.body;
                // Validamos los parametros
                if(!title || !smallDescription || !bigTitle || !bigDescription || !wallpaper) return res.status(501).json({msg: 'Los parametros no son validos.'});
                // Caso contrario, avanzamos
                const createCategory = await category.update({ 
                    title,
                    smallDescription,
                    bigTitle,
                    bigDescription,
                    wallpaper,
                }, {
                    where: {
                        id: categoryId
                    }
                }).catch(err => {
                    console.log(err);
                    return null;
                });
                // Verificamos si se creo correctamente
                if(!createCategory) return res.status(502).json({msg:'No hemos podido crear esto. '});
                // Caso contrario, mostramos la creacion
                res.status(201).json(createCategory);
 
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal.'});
            }
        },
    

        // Mostramos todas la categorias
        async getAllCategory(req, res){
            try{
                console.log('entra la funcion')
                // Procedemos a buscar todas las categorias activas.
                const searchCategories = await category.findAll({
                    where: {
                        state: 'active'
                    },
                    include:[{
                        model: subcategory
                    }],
                    order:[['updatedAt', 'DESC'], [{model: subcategory}, 'createdAt', 'ASC']]
                }).catch(err => {
                    console.log(err);
                    return null;
                });

                if(!searchCategories || !searchCategories.length) return res.status(404).json({msg:'No hay resultados'});

                // Caso contrario, avanzamos 
                res.status(200).json(searchCategories);
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal.'});
            }
        },
        // Mostrar categoria por ID especifico
        async getCategoryById(req, res){
            try{
                // Obtenemos todos los parametros por params
                const { categoryId } = req.params;
                // Verificamos que el parametro entre correctamente
                if(!categoryId) return res.status(501).json({msg: 'Los parametros no son validos.'});
                // Caso contrario, avanzamos...
                
                const searchCategory = await category.findOne({
                    where: {
                        title: categoryId
                    },
                    include:[{
                        model:subcategory, 
                        include:[{
                            model: product
                        }]
                    }],
                    order:[['updatedAt', 'DESC'], [{model: subcategory}, 'createdAt', 'ASC'], [{model: subcategory}, {model: product}, 'createdAt', 'ASC']]

                }).catch(err => {
                    console.log(err);
                    return null
                });

                if(!searchCategory) return res.status(404).json({msg: 'No hemos encontrado esta categoria'});
                // Caso contrario, enviamos respuesta
                res.status(200).json(searchCategory);
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
            }
        }, 
        // --- SUB CATEGORIAS
        async getSubCategory(req, res){
            try{
                // Recibimos categoria por ID
                const { cat, sub } = req.params; 

                // Validamos que entre
                if(!sub) return res.status(501).json({msg: 'Los parametros no son validos.'});

                // Caso contrario, avanzamos...
                const searchSub = await subcategory.findOne({
                    where: {
                        title: sub,
                        categoryId: cat
                    },
                    include: [{model: category}, {
                        model: product,
                        include: [{
                            model: media 
                        }]
                    }],
                    order:[['createdAt', 'DESC'], [{model: product}, 'createdAt', 'ASC']]
                    
                }).catch(err => {
                    console.log(err);
                    return null; 
                });
                // Si no hay resultados. Not found!
                if(!searchSub) return res.status(404).json({msg: 'No hemos encontrado esto.'});

                // Avanzamos
                res.status(200).json(searchSub);
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal.'});
            }
        },
        async UpdateNameSubcategory(req, res){
            try{
                // Recibimos valores por body
                const { title, subcategoryId } = req.body;

                //Validamos la entrada
                if(!title | !subcategoryId) return res.status(501).json({msg: 'Los parametros no son validos.'});
                // Caso contrario, avanzamos...
                
                const updateSub = await subcategory.update({
                    title,
                }, {
                    where: {
                        id: subcategoryId
                    }
                }).catch(err => {
                    console.log(err);
                    return null;
                });

                if(!updateSub) return res.status(502).json({msg: 'No hemos podido actualizar est0'});

                // Caso contrario, enviamos respuesta
                res.status(200).jso({msg: 'Actualizado con exito.'});
            }catch(err){
                console.log(err);
                res.status(500).json({msg: 'Ha ocurrido un error en la principal'});
            }
        },
        async NewSubCategory(req, res){
            try{
                const { name, categoryId } = req.body;
                if(!name || !categoryId) return res.status(501).json({msg: 'Los parametros no son validos.'});


                const addSubCategory = await subcategory.create({
                    title: name,
                    categoryId,
                    state: 'active'
                }).catch(err => {
                    console.log(err);
                    return null;
                });

                if(!addSubCategory) return res.status(502).json({msg: 'No hemos logrado crear esto.'});
                // Caso contrario, avanzamos
                res.status(201).json(addSubCategory);
            }catch(err){
                console.log(err);
                res.status(500).jso({msg: 'Ha ocurrido un error en la principal.'});
            }
        }
}

