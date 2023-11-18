const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const session = require('express-session');

let handleLogin = (email, pass) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {}

            let isExist = await checkEmail(email);
            if (isExist) {
                let user = await userModel.findOne({
                    email: email
                }) //tìm lại email rồi check mật khẩu
                if (user) {
                    let checkPass = await bcrypt.compareSync(pass, user.password)
                    if (checkPass) {
                        userData.errCode = 0 //đúng mật khẩu
                        userData.message = 'Logging...'
                        userData.user = user
                        session.user=user
                    } else {
                        userData.errCode = 3 //sai mật khẩu
                        userData.message = 'Email hoặc mật khẩu không hợp lệ' 
                    }
                } else {
                    userData.errCode = 2 //email ko tồn tại(1)
                    userData.message = 'Email hoặc mật khẩu không hợp lệ' 
                }
                
            } else {
                userData.errCode = 1 //email ko tồn tại
                userData.message = 'Email hoặc mật khẩu không hợp lệ' 
            }
            resolve(userData)
        } catch (error) {
            console.log(error)
        }
    })
}

let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await userModel.findOne({
                email: email
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    handleLogin
}