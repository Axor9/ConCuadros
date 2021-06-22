const express = require('express');
const router = express.Router();

const pool = require('../database');
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

router.get('/',(req,res) =>{
    if(req.user){
        res.redirect('account/profile');
    }else{
        res.redirect('account/login');
    }
    
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.get('/login',(req,res)=>{
    res.render('account/login',{
        style : 'account/login.css'
    });
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect : '/',
        failureRedirect : 'login',
        failureFlash : true
    })(req,res,next)
});

router.get('/register',(req,res)=>{
    res.render('account/register',{
        style : 'account/register.css'
    });
});

router.get('/password',(req,res)=>{
    res.render('account/password',{
        style : 'account/password.css'
    });
});

router.post('/register',passport.authenticate('local.signup',{
    successRedirect : '/',
    failureRedirect : 'register',
    failureFlash : true
}));

module.exports = router;