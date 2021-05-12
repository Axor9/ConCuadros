const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/',async (req,res) =>{

    res.render('cart/cart');
});