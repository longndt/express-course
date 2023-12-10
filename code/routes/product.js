var express = require('express');
var router = express.Router();
var ProductModel = require('../models/ProductModel');
var CategoryModel = require('../models/CategoryModel');
const checkSession = require('../middlewares/auth');

router.get('/', checkSession, async (req, res) => {
   var productList = await ProductModel.find({}).populate('category');
   res.render('product/index', { productList });
});

router.get('/add', async (req, res) => {
   var categoryList = await CategoryModel.find({});
   res.render('product/add', { categoryList });
})

router.post('/add', async (req, res) => {
   try {
      var product = req.body;
      await ProductModel.create(product);
      res.redirect('/product');
   }
   catch (err) {
      if (err.name === 'ValidationError') {
         let InputErrors = {};
         for (let field in err.errors) {
            InputErrors[field] = err.errors[field].message;
         }
         res.render('product/add', { InputErrors, product });
      }
   }
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var product = await ProductModel.findById(id);
   res.render('product/edit', { product });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var data = req.body;
   await ProductModel.findByIdAndUpdate(id, data);
   res.redirect('/product');
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await ProductModel.findByIdAndDelete(id);
   res.redirect('/product');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   var productList = await ProductModel.find({ name: new RegExp(keyword, "i") }).populate('category');
   res.render('product/index', { productList })
})

router.get('/sort/asc', async (req, res) => {
   var productList = await ProductModel.find().sort({ name: 1 }).populate('category');
   res.render('product/index', { productList })
})

router.get('/sort/desc', async (req, res) => {
   var productList = await ProductModel.find().sort({ name: -1 }).populate('category');
   res.render('product/index', { productList })
})

module.exports = router;