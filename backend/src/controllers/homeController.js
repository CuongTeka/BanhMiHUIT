const userService = require('../services/userService')
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
// const checkSession = (req, res) => {
//     var acc = req.session.account;
//     res.json('ID: ' + acc._id + ' | User: ' + acc.name + ' | Role: ' + acc.role);
//     // console.log(req.session)
// }

const registerFunction = async(req, res) => {
    const { email, pass, name, mssv, phone } = req.body;
    if(!email || !pass || !name || !mssv || !phone)
    {
        return res.status(500).json({
            errCode: 1,
            message: 'Vui lòng nhập đầy đủ thông tin đăng ký'
        })
    }
    if(!isValidEmail(email)){
        return res.status(500).json({
            errCode: 2,
            message: 'Email không đúng định dạng'
        })
    }
    if(pass.length<=5){
        return res.status(500).json({
            errCode: 3,
            message: 'Mật khẩu phải có ít nhất 6 ký tự'
        })
    }
    if(mssv.length<=9){
        return res.status(500).json({
            errCode: 4,
            message: 'Mã số sinh viên không đúng định dạng'
        })
    }
    if(!validateVietnamesePhoneNumber(phone)){
        return res.status(500).json({
            errCode: 5,
            message: 'Số điện thoại không đúng định dạng'
        })
    }
    let check = await userService.handleRegisterData(email, pass, name, mssv, phone)
    const encryptPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(5));
    if(check.errCode == 1)
    {
        return res.status(500).json({
            errCode: 2,
            message: 'Email đã tồn tại'
        })
    }
    else if(check.errCode == 2){
        return res.status(500).json({
            errCode: 5,
            message: 'Số điện thoại đã tồn tại'
        })
    }
    else if(check.errCode == 3){
        return res.status(500).json({
            errCode: 4,
            message: 'Mã số sinh viên đã tồn tại'
        })
    }else{
            console.log('Đã tạo tài khoản')
            res.status(200).json({
                    errCode: 0,
                    message: 'Tạo tài khoản thành công'
                })
            return userModel.create({
                email: email,
                password: encryptPass,
                name: name,
                mssv: mssv,
                phone: phone,
            }) 
        //thêm role: 1 nếu cần tạo acc admin
        }
        
    }
            
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
const validateVietnamesePhoneNumber = (phoneNumber) => {
    // 09 03 01
    const vietnamesePhoneNumberRegex = /^(0[1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/;
  
    return vietnamesePhoneNumberRegex.test(phoneNumber);
  }; 

  let handleGetAllCategory = async(req, res) => {
    let id = '*'
    let category = await userService.getCategory(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get all',
        data: category
    })
}

module.exports = {
    // checkSession,
    registerFunction,
    handleGetAllCategory,
}