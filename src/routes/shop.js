const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const passport = require('passport');

const pool = require('../database');


router.get('/',async (req,res) =>{
    const { filter,order } = req.query;
    var products = [];

    if(filter == "all" || filter == undefined){
        switch(order){
            case '1':
                products = await pool.query('SELECT * FROM products order by name');
                break;
            case '2':
                products = await pool.query('SELECT * FROM products order by name desc');
                break;
            case '3':
                products = await pool.query('SELECT * FROM products order by price');
                break;
            case '4':
                products = await pool.query('SELECT * FROM products order by price desc');
                break;
            default :
                products = await pool.query('SELECT * FROM products order by name');
                break;

        }
    }else{
        switch(order){
            case '1':
                products = await pool.query('SELECT * FROM products where id_categories = ? order by name',[filter]);
                break;
            case '2':
                products = await pool.query('SELECT * FROM products where id_categories = ? order by name desc',[filter]);
                break;
            case '3':
                products = await pool.query('SELECT * FROM products where id_categories = ? order by price',[filter]);
                break;
            case '4':
                products = await pool.query('SELECT * FROM products where id_categories = ? order by price desc',[filter]);
                break;
        }
    }
    
    
    const categories = await pool.query('SELECT * FROM categories order by name');


    res.render('shop/shop',{
        style : 'shop/shop.css',
        products,
        categories,
        order,
        filter
    });
});


router.post('/insert/:id',async (req,res) =>{
    if(req.user){
        const { id } = req.params;
        const id_products = id;
        const id_user = req.user.id;
        const { size } = req.body;

        const id_sizes_query = await pool.query('SELECT id_sizes FROM sizes WHERE name = ?',[size]);
        const id_sizes = id_sizes_query[0].id_sizes;
        const quantity = 1;

        const newProductCart = {
            id_products,
            id_user,
            id_sizes,
            quantity
        }

        await pool.query('INSERT INTO cart set ?',[newProductCart]);

        const productCart = await pool.query('SELECT * FROM products WHERE id_products = ?',[id_products]);
        console.log(productCart);
        req.flash('cart',productCart);
        res.redirect('/shop');

    }else{
        const { id } = req.params;
        req.flash('message','Inicie sesión para añadir al carrito');
        res.redirect('/shop');
    }
    
});


router.get('/add',async (req,res)=>{
    res.render('shop/add');
});

router.post('/add',async (req,res) =>{
    var created = new Date();
    var {originalname} = req.files[0];
    image_p = originalname;
    const { name, price,description,id_categories} = req.body;
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
        style : '/shop/product.css'
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
        var newProductCart = {
            id_products,
            id_user,
            id_sizes,
            quantity
        }
        await pool.query('INSERT INTO cart set ?',[newProductCart]);

        const products = await pool.query('SELECT * FROM products WHERE id_products = ?',[id_products]);
        const { name,price,image } = products;
        req.flash('cart',products);
        res.redirect('/shop/product/' + id);

    }else{
        const { id } = req.params;
        req.flash('message','Inicie sesión para añadir al carrito');
        res.redirect('/shop/product/' + id);
    }
});




module.exports = router;