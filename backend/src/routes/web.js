const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const homeController = require('../controllers/homeController');
const cateController = require('../controllers/cateController')
const productController = require('../controllers/productController')
const authController = require('../controllers/authController')

//thứ tự:
//get
//create
//update
//delete

//user
router.get('/get-all-user', userController.handleGetAllUser)
router.get('/get-user-byid', userController.handleFindUserById)
router.post('/update-user/', userController.updateUser)
router.get('/delete-user/', userController.deleteUser)
router.post('/delete-many-user', userController.deleteMany)
//product
router.get('/get-all-product', productController.handleGetAllProduct)
router.get('/get-product-by-name/:name', productController.handleGetProductByName)
router.post('/create-product', productController.createProduct)
router.post('/update-product/', productController.updateProduct)
router.get('/delete-product/', productController.deleteProduct)
router.post('/delete-many-product')
//category
router.get('/get-all-category', cateController.handleGetAllCategory)
router.get('/get-category-by-id', cateController.handleGetCategoryById)

//order

//feedback

//ultility
router.post('/signin' , authController.checkLogin)
router.post('/signup', homeController.registerFunction)
router.get('/images/', homeController.handleGetProductImage)

module.exports = router;