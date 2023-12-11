var express = require('express');
var router = express.Router();
//remember to import models before use
var CategoryModel = require('../models/CategoryModel');
var ProductModel = require('../models/ProductModel');

//URL: localhost:3000/category
//SQL: SELECT * FROM category
//must include "async", "await"
router.get('/', async (req, res) => {
   //retrieve data from "categories" collection
   var categoryList = await CategoryModel.find({});
   //render view and pass data
   res.render('category/index', { categoryList });
});

//URL: localhost:3000/category/delete/'id'
//SQL: DELETE FROM category WHERE _id = 'id'
router.get('/delete/:id', async (req, res) => {
   //req.params: get value by url
   var id = req.params.id;
   await CategoryModel.findByIdAndDelete(id);
   res.redirect('/category');
})

//render form for user to input
router.get('/add', (req, res) => {
   res.render('category/add');
})

//receive form data and insert it to database
router.post('/add', async (req, res) => {
   //req.body: get value by form
   var category = req.body;
   await CategoryModel.create(category);
   res.redirect('/category');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var category = await CategoryModel.findById(id);
   res.render('category/edit', { category });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var data = req.body;
   await CategoryModel.findByIdAndUpdate(id, data);
   res.redirect('/category');
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   var productList = await ProductModel.find({ category: id }).populate('category');
   res.render('product/index', { productList })
})
module.exports = router;


