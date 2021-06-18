const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const passport = require('passport');

const pool = require('../database');


router.get('/',async (req,res) =>{
    const products = await pool.query('SELECT * FROM products');

    console.log(products);

    res.render('shop/shop',{
        style : 'shop.css',
        products : products
    });
});


router.get('/add',async (req,res)=>{
    res.render('shop/add');
});

router.post('/add',async (req,res) =>{
    var created = new Date();
    var {originalname} = req.files[0];
    image_p = originalname;
    const { name, price,description,id_categories,id_sizes} = req.body;
    const newProduct = {
        name,
        price,
        description,
        id_categories,
        image_p

    };
    await pool.query('INSERT INTO products set ?',[newProduct]);

    const products = await pool.query('SELECT id_products from products where id_products = (select MAX(id_products) from products) ');
    id_products = products[0].id_products;
    console.log(id_products);


    for (i=0;i<req.files.length;i++){
        var {originalname} = req.files[i];
        image = originalname;

        var newImage ={
            id_products,
            image,
            created
        };
        await pool.query('INSERT INTO images set ?',[newImage]);


    }
    res.redirect('/shop');
});

router.get('/product/:id',async(req,res) =>{
    const { id } = req.params;
    const id_products = id;
    const products = await pool.query('SELECT * FROM products WHERE id_products = ?',[id_products]);
    const images = await pool.query('SELECT * FROM images WHERE id_products = ?',[id_products]);

    const main_img = images[0].image;

    res.render('shop/product',{
        products,
        images,
        main_img,
        style : 'product.css'
    });
});

router.post('/product/:id',async(req,res) =>{
    if(req.user){
        const { id } = req.params;
        const id_products = id;
        const id_user = req.user.id;
        const { quantity,size } = req.body;

        const id_sizes_query = await pool.query('SELECT id_sizes FROM sizes WHERE name = ?',[size]);
        const id_sizes = id_sizes_query[0].id_sizes;
        for(i = 0;i<quantity;i++){
            var newProductCart = {
                id_products,
                id_user,
                id_sizes
            }
            await pool.query('INSERT INTO cart set ?',[newProductCart]);

        }
        const products = await pool.query('SELECT * FROM products WHERE id_products = ?',[id_products]);
        const { name,price,image } = products;
        req.flash('cart',"name");
        res.redirect('/shop/product/' + id);

    }else{

    }
});




module.exports = router;