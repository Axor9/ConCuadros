const express = require('express');
const router = express.Router();
const passport = require('passport');

const pool = require('../database');

router.get('/',async(req,res) =>{
    const user = req.user;

    const products = await pool.query('SELECT * FROM products limit 3');

    res.render('layouts/index',{
        style : 'index.css',
        products,
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
        res.redirect('/');

    }else{
        const { id } = req.params;
        req.flash('message','Inicie sesión para añadir al carrito');
        res.redirect('/');
    }
    
});

module.exports = router;