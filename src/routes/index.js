const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    res.render('layouts/index',{
        style : 'index.css',
    });
});

module.exports = router;