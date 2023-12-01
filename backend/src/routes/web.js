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
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id', userController.deleteUser)
router.post('/delete-many-user', userController.deleteMany)
//product
router.get('/get-all-product', productController.handleGetAllProduct)
router.post('/get-product-by-name/:name', productController.handleGetProductByName)
router.post('/create-product')
router.put('/update-product/:id')
router.delete('/delete-product/:id')
router.post('/delete-many-product')
//category
router.get('/get-all-category', cateController.handleGetAllCategory)
router.post('/get-category-by-id', cateController.handleGetCategoryById)

//order

//feedback

//ultility
router.post('/signin' , authController.checkLogin)
router.post('/signup', homeController.registerFunction)
router.get('/images/', homeController.handleGetProductImage)

module.exports = router;