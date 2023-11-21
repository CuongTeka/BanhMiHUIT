const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const homeController = require('../controllers/homeController');


router.get('/get-all-user', adminController.handleGetAllUser)
router.get('/get-user-byid', adminController.handleFindUserById)
router.get('/get-all-product', adminController.handleGetAllProduct)
router.get('/get-all-category', homeController.handleGetAllCategory)

module.exports = router;