const express = require('express');
const productController = require('../controllers/productController');//ProductController
const router = express.Router();

router.post('/product',productController.addProduct);
router.get('/allProduct',productController.index);
module.exports =router;