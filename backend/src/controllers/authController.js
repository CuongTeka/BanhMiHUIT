const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const session = require('express-session');
const userService = require('../services/authService')

// const registerFunction = (req, res, next) => {
//     const encryptPass = bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync(5));
//     userModel.findOne({
//         email: req.body.email
//     })
//     .then(data=>{
//         if(data){
//             console.log('Email da ton tai')
//         }else{
//             return userModel.create({
//                 email: req.body.email,
//                 password: encryptPass,
//                 name: req.body.name,
//                 mssv: req.body.mssv,
//                 phone: req.body.phone
//             })
//         }
//     })
//     .then(data=>{
//         console.log('Tao thanh cong')
//         res.redirect('/signin')
//     })
//     .catch(err=>{
//         console.log('Tao that bai')
//     })
// }

const checkLogin = async(req, res) => {
    var ses = req.session;
    // console.log(session.user)

    if(!req.body.email || !req.body.pass)
    {
        return res.status(500).json({
            errCode: 1,
            message: 'Vui lòng nhập thông tin đăng nhập'
        })
    }
    let userData = await userService.handleLogin(req.body.email, req.body.pass)

    if(userData.errCode != 0){
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.message,
        })
    }else{
        return res.status(200).json({
            errCode: userData.errCode,
            message: userData.message,
            user: userData.user ? userData.user : {}
        })
    }
}



// const logout = (req, res) => {
//     var acc = req.session.account;
//     // var ses = req.session;
//     if(acc)
//     {
//         // req.session.cookie.expires = new Date().getTime()
//         req.sessionStore.destroy(req.session.id)
//         console.log('session cleared')  
//         res.redirect('/')
//     }
//     res.redirect('/')
// }

module.exports = { 
    checkLogin, 
    // logout
}