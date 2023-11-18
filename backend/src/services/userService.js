const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

let handleRegisterData = (email, pass, name, mssv, phone) => {
    return new Promise(async(resolve, reject) => {
        try {
            let message = {}

            let isEmailExist = await checkEmail(email);
            let isPhoneExist = await checkPhone(phone);
            let isMSSVExist = await checkMSSV(mssv);
            if (isEmailExist) {
                    message.errCode = 1,
                    message.message = 'Email đã tồn tại'
                }
            if (isPhoneExist) {
                message.errCode = 2,
                message.message = 'Số điện thoại đã tồn tại'
            }
            if (isMSSVExist) {
                message.errCode = 3,
                message.message = 'Mã số sinh viên đã tồn tại'
            }
            resolve(message)
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
let checkPhone = (phone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await userModel.findOne({
                phone: phone
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
let checkMSSV = (mssv) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await userModel.findOne({
                mssv: mssv
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
    handleRegisterData
}