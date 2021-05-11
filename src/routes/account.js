const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/',(req,res) =>{
    res.redirect('account/login');
});

router.get('/login',(req,res)=>{
    res.render('account/login',{
        style : 'account/login.css'
    });
});

router.get('/register',(req,res)=>{
    res.render('account/register',{
        style : 'account/register.css'
    });
});

module.exports = router;