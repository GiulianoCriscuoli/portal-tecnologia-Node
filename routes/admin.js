const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categorie');

const Categorie = mongoose.model("categories");

router.get('/', (req, res) => {

    res.render("admin/index");

});

router.get('/posts', (req, res) => {

    res.send("Posts");

});

router.get('/categorias', (req, res) => {
  Categorie.find().then((categories) => {
    res.render("admin/categories", { categories: categories.map(category => category.toJSON())
    
});

  }).catch(err => {
    req.flash("error", "Houve um erro ao listar as categorias");
    res.redirect("/admin");
  });
    
});

router.get('/categorias/add', (req, res) => {
    res.render("admin/addCategories");

});

router.post('/categorias/addAction', (req, res) => {

    let errors = [];

    if(!req.body.name || typeof req.body.name === undefined || req.body.name === null) {

        errors.push({ msgs: "O nome está vazio" });

    }

    if(req.body.name.length < 2 || req.body.name.length > 40) {

        errors.push({ msgs: "O nome da categoria é menor que 2 ou maior que 40 caracteres" });
    }

    if(!req.body.slug || typeof req.body.slug === undefined || req.body.slug === null) {

        errors.push({ msgs: "O slug está vazio" });
    }

    if(errors.length > 0) {
        
        res.render("admin/addCategories", { errors: errors });

    } else {

        const newCategorie = {
            name: req.body.name,
            slug: req.body.slug.toLowerCase()   
        }
     
        new Categorie(newCategorie).save().then(() => {
         req.flash("success", "Sucesso ao registrar uma nova categoria");
         res.redirect("/admin/categorias");
     
        }).catch(err => {
          req.flash("error", "Erro ao registrar, tente novamente");
          res.redirect("/admin");
     
        });
        
    }
 
});

module.exports = router;