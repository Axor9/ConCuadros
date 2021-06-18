const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/about',async (req,res) =>{

    res.render('pages/about',{
        style : 'pages/about.css'
    });
});

router.get('/contact',async (req,res) =>{

    res.render('pages/contact',{
        style : 'pages/contact.css'
    });
});


module.exports = router;