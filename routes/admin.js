const express = require('express');
const router = express.Router();

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

module.exports = router;