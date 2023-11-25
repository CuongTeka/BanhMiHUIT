const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const homeController = require('../controllers/homeController');

//user
router.get('/get-all-user', adminController.handleGetAllUser)
router.get('/get-user-byid', adminController.handleFindUserById)
//product
router.get('/get-all-product', adminController.handleGetAllProduct)
//category
router.get('/get-all-category', homeController.handleGetAllCategory)
//order
//feedback
//ultility
router.get('/images/', homeController.handleGetProductImage)
module.exports = router;