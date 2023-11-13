const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const express = require('express');

const registerFunction = (email, pass, name, mssv, phone) => {
    const encryptPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(5));
    userModel.findOne({
        email: email
    })
    .then(data=>{
        if(data){
            console.log('email da ton tai');
        }else{
            return userModel.create({
                email: email,
                password: encryptPass,
                name: name,
                mssv: mssv,
                phone: phone
            })
        }
    })
    .then(data=>{
        console.log('Tao thanh cong');
    })
    .catch(err=>{
        console.log('Tao that bai');
    })
}

const checkLogin = (req, res, next) => {
    var email = req.body.email;
    var pass = req.body.pass;
    // const encryptPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(5));
    userModel.findOne({
        email: email
    })
    .then(data => {
        if(data){
            if(bcrypt.compareSync(pass, data.password))
            {
                console.log('Đăng nhập thành công');
                if(data.role == 1){
                    res.redirect('/new') //redirect tới trang admin (hoặc '/' nhưng có chức năng của admin)
                    console.log('role: ' + data.role)
                }else{
                    res.redirect('/') //redirect tới trang user
                    console.log('role: ' + data.role)
                }
            }else{
                console.log('Sai email hoặc mật khẩu');
            }
        }else{
            console.log('Sai email hoặc mật khẩu');
        }
    })
    .catch(err=>{
        console.log('Lỗi server');
    })
}

const checkRole = (uid) => {
    userModel.findOne({
        _id: uid
    })
    .then(data => {
        if(data.role == '0'){
            return 0;
        }
        else{
            return 1;
        }
    })
    .catch(err=>{
        console.log('Lỗi server');
    })
}

module.exports = {
    registerFunction, checkLogin, checkRole,
}