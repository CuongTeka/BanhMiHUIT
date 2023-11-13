const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

// router.post('/post', tryLogin);

router.post('/validate_login' , authController.checkLogin)
// router.post('/dadada', (req, res, next) => {
//     res.
// }


router.post('/validate_register', (req, res, next) => {
    var email = req.body.email;
    var password = req.body.pass;
    var name = req.body.name;
    var mssv = req.body.mssv;
    var phone = req.body.phone;

    registerFunction(email, password, name, mssv, phone);
    console.log(email, password, name, mssv, phone);
    console.log('User tạo tài khoản thành công');
    res.redirect('/signin');
});

module.exports = router;