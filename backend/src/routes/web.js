const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const session = require('express-session');

//login + logout + register =================================
router.post('/signin' , authController.checkLogin)
router.get('/logout', authController.logout)
router.post('/signup', authController.registerFunction)
//===========================================================
router.get('/test', homeController.checkSession)
// router.post('/dadada', (req, res, next) => {
//     res.
// }
module.exports = router;