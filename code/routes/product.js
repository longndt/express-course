var express = require('express');
var router = express.Router();
var ProductModel = require('../models/ProductModel');
var CategoryModel = require('../models/CategoryModel');
const { checkSingleSession, checkMultipleSession } = require('../middlewares/auth');

//import and config "multer" package
var multer = require('multer');

var prefix = Math.floor(Math.random() * 100000000) + 1;

const storage = multer.diskStorage(
   {
      destination: (req, file, cb) => {
         cb(null, './public/images');
      },
      filename: (req, file, cb) => {
         let fileName = prefix + "_" + file.originalname;
         cb(null, fileName);
      }
   }
);

const upload = multer({ storage: storage })

router.get('/', checkMultipleSession(['user', 'admin']), async (req, res) => {
   var productList = await ProductModel.find({}).populate('category');
   res.render('product/index', { productList });
});

router.get('/add', checkSingleSession, async (req, res) => {
   var categoryList = await CategoryModel.find({});
   res.render('product/add', { categoryList });
})

router.post('/add', upload.single('image'), async (req, res) => {
   try {
      var product = req.body;
      product.image = prefix + "_" + req.file.originalname;
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