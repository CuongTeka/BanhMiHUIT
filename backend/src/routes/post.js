const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

router.post('/signin' , authController.checkLogin)
router.post('/signup', authController.registerFunction)

module.exports = router;