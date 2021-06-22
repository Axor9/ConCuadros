const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

const pool = require('../database');

router.post('/delete',async (req,res) =>{
    if(req.user){
        const id_products = req.body.hidden;
        const id_user = req.user.id;
        await pool.query('DELETE from cart where id_products = ? and id_user = ?',[id_products,id_user]);

        res.redirect('/cart');
    }else{
        res.redirect('/cart');
    }
});

router.get('/',async (req,res) =>{
    
    if(req.user){
        const products_cart = [];
        var total_price = 0;
        const cart = await pool.query('SELECT * FROM cart where id_user = ?',[req.user.id]);
        var product;
        
        for (i=0;i<cart.length;i++){
            product = await pool.query('SELECT * FROM products where id_products = ?',[cart[i].id_products]);
            sizes = await pool.query('SELECT * FROM sizes where id_sizes = ?',[cart[i].id_sizes]);
            total_price = product[0].price+total_price;

            var producto_de_carrito ={
                id_products : product[0].id_products,
                name : product[0].name,
                price : product[0].price,
                description : product[0].description,
                id_categories : product[0].id_categories,
                image_p : product[0].image_p,
                quantity : cart[i].quantity,
                size : sizes[0].name
            }
            
            products_cart.push(producto_de_carrito);  
        }
        console.log(products_cart);
        total_price = total_price.toFixed(2);

        res.render('cart/cart',{
            style : 'cart.css',
            products_cart,
            total_price,
            user : req.user
        });
    }else{
        res.render('cart/cart',{
            style : 'cart.css'
        });
    }

    
});

router.get('/order',async(req,res) =>{
    if(req.user){
        const products_cart = [];
        var total_price = 0;
        const cart = await pool.query('SELECT * FROM cart where id_user = ?',[req.user.id]);
        var product;
        
        for (i=0;i<cart.length;i++){
            product = await pool.query('SELECT * FROM products where id_products = ?',[cart[i].id_products]);
            sizes = await pool.query('SELECT * FROM sizes where id_sizes = ?',[cart[i].id_sizes]);
            total_price = product[0].price+total_price;

            var producto_de_carrito ={
                id_products : product[0].id_products,
                name : product[0].name,
                price : product[0].price,
                description : product[0].description,
                id_categories : product[0].id_categories,
                image_p : product[0].image_p,
                quantity : cart[i].quantity,
                size : sizes[0].name
            }
            
            products_cart.push(producto_de_carrito);  
        }
        total_price = total_price.toFixed(2);

        res.render('cart/order',{
            style : 'order.css',
            products_cart,
            total_price
        });
    }else{
        res.render('cart',{
            style : 'cart.css',
        });
    }
});

module.exports = router;