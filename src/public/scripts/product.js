const express = require('express');
const pool = require('../database');
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

function cambiarboton(comp){
    let id = comp.id;
    
    if(id == "boton-no-selected"){
        var i=document.getElementById("boton-selected");
        i.setAttribute("id","boton-no-selected");

        comp.setAttribute("id","boton-selected");
        var j=document.getElementById("size");
        j.setAttribute("value",comp.value);
    }
}

function cambiarImagen(comp){
    let src_image = comp.src;

    var i = document.getElementById("main-image");
    i.setAttribute("src",src_image);
}

