const express = require('express');
const router = express.Router();

const pool = require('../database');
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

router.get('/',(req,res) =>{
    res.redirect('account/login');
});

router.get('/login',(req,res)=>{
    res.render('account/login',{
        style : 'account/login.css'
    });
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect : 'profile',
        failureRedirect : 'login',
        failureFlash : true
    })(req,res,next)
});

router.get('/register',(req,res)=>{
    res.render('account/register',{
        style : 'account/register.css'
    });
});

router.post('/register',passport.authenticate('local.signup',{
    successRedirect : 'profile',
    failureRedirect : 'register',
    failureFlash : true
}));

router.get('/profile', isLoggedIn,(req,res)=>{
    res.render('account/profile',{
        style : 'account/profile.css'
    });
});

module.exports = router;