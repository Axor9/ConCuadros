const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/',async (req,res) =>{
    const products = await pool.query('SELECT * FROM products');

    res.render('shop/shop',{
        style : 'shop.css',
        products : products
    });
});


router.get('/add',(req,res)=>{
    res.render('shop/add');
});

router.post('/add',async (req,res) =>{
    const { name, price,description,id_categories,id_sizes} = req.body;
    const newProduct = {
        name,
        price,
        description,
        id_categories,
        id_sizes
    };

    await pool.query('INSERT INTO products set ?',[newProduct]);
    
    res.redirect('/shop');
});

module.exports = router;