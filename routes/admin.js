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

    res.render("admin/categories");
});

router.get('/categorias/add', (req, res) => {
    res.render("admin/addCategories");

});

router.post('/categorias/addAction', (req, res) => {

   const newCategorie = {
       name: req.body.name,
       slug: req.body.slug
    
   }

   new Categorie(newCategorie).save().then(() => {
    console.log("Categoria salva com sucesso!");

   }).catch(err => {
     console.error("Erro ao salvar a categoria!");

   });
});

module.exports = router;