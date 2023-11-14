const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const session = require('express-session');

const registerFunction = (req, res, next) => {
    // var email = req.body.email;
    // var pass = req.body.pass;
    // var name = req.body.name;
    // var mssv = req.body.mssv;
    // var phone = req.body.phone;
    const encryptPass = bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync(5));
    userModel.findOne({
        email: req.body.email
    })
    .then(data=>{
        if(data){
            console.log('Email da ton tai')
        }else{
            return userModel.create({
                email: req.body.email,
                password: encryptPass,
                name: req.body.name,
                mssv: req.body.mssv,
                phone: req.body.phone
            })
        }
    })
    .then(data=>{
        console.log('Tao thanh cong')
        res.redirect('/signin')
    })
    .catch(err=>{
        console.log('Tao that bai')
    })
}

const checkLogin = (req, res, next) => {
    // var email = req.body.email;
    // var pass = req.body.pass;
    var ses = req.session;
    if(!ses.userid){
        userModel.findOne({
        email: req.body.email
    })
    .then(data => {
        if(data){
            if(bcrypt.compareSync(req.body.pass, data.password))
            {
                console.log('Đăng nhập thành công')
                ses.userid=data._id;
                ses.username=data.name;
                ses.role=data.role;
                console.log(ses.userid)
                console.log(ses.username)
                if(checkRole(data._id) == 1){
                    res.redirect('/new') //redirect tới trang admin (hoặc '/' nhưng có chức năng của admin)
                    console.log('role: ' + data.role)
                }else{
                    res.redirect('/') //redirect tới trang user
                    console.log('role: ' + data.role)
                }
            }else{
                console.log('Sai email hoặc mật khẩu')
            }
        }else{
            console.log('Sai email hoặc mật khẩu')
        }
    })
    .catch(err=>{
        console.log('Lỗi server')
        console.log(err)
    })
    }else{
        console.log('Đã đăng nhập')
        res.redirect('/')
    }
    
}

const checkRole = (uid) => {
    userModel.findOne({
        _id: uid
    })
    .then(data => {
        if(data.role == 0){
            return 0;
        }
        else{
            return 1;
        }
    })
    .catch(err=>{
        console.log('Lỗi server')
    })
}

const logout = (req, res) => {
    var ses = req.session;
    if(ses.userid)
    {
        // req.session.cookie.expires = new Date().getTime()
        // req.session=null;
        req.sessionStore.destroy(req.session.id)
        // session.userid=null
        // session.username=null
        // session.role=null
        console.log('session cleared')  
        res.redirect('/')
    }
    res.redirect('/')
}

module.exports = {
    registerFunction, checkLogin, checkRole, logout
}