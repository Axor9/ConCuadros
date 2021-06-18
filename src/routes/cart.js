const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

const pool = require('../database');

router.get('/',async (req,res) =>{
    const cart = await pool.query('SELECT * FROM cart where id_user = ?',[req.user.id]);
    var product;
    const products_cart = [];
    
    for (i=0;i<cart.length;i++){
        product = await pool.query('SELECT * FROM products where id_products = ?',[cart[i].id_products]);
        products_cart.push(product[0]);  
    }
    console.log(products_cart);

    res.render('cart/cart',{
        style : 'cart.css',
        products_cart : products_cart
    });
});

module.exports = router;