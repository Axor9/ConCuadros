const express = require('express');
const pool = require('../database');
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');


function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

function orderby() {
    document.getElementById("myDropdown2").classList.toggle("show");
}
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

function cambiarboton(comp){
  let id = comp.id;
    
  if(id == "boton-no-selected"){
    
      /*var i=document.getElementById(comp.id);
      i.setAttribute("class","boton-no-selected");
      i.setAttribute("name","boton_no_selected");*/

      const demoClasses = document.querySelectorAll(".boton-selected-" + comp.name);

      // Change the text of multiple elements with a loop
      demoClasses.forEach(element => {
        element.id = 'boton-no-selected';
        element.className = 'boton-no-selected-' + comp.name;
      });

      comp.setAttribute("id","boton-selected");
      comp.setAttribute("class","boton-selected-"+comp.name);
      var j=document.getElementById("size-" + comp.name);
      j.setAttribute("value",comp.value);
  }
}
