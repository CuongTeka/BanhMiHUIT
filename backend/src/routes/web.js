const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');



//login + logout + register =================================



//===========================================================
router.get('/test', homeController.checkSession)

module.exports = router;