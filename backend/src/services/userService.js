const userModel = require('../models/userModel');
const cateModel = require('../models/categoryModel');
const productModel = require('../models/productModel');
const bcrypt = require('bcrypt');

let Register = (newUser) => {
    return new Promise(async(resolve, reject) => {
        const { email, pass, name, mssv, phone } = newUser
        try {
            const encryptPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(5));
            const createUser = await userModel.create({
                email,
                password: encryptPass,
                name,
                mssv,
                phone
            })
            if(createUser){
                resolve({
                    errCode: 0,
                    message: 'Tạo tài khoản thành công',
                })
            }
        } catch (error) {
            // console.log(error)
            reject(error);
        }
    })
}//thêm user

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

let getUser = (Id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if(Id === '*'){
                users = await userModel.find({}).select({ password: 0 })
            }
            if(Id && Id !== '*'){
                users = await userModel.findOne({
                    _id: Id
                }).select({ password: 0 })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}//lấy user

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await userModel.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    errCode: '500',
                    message: 'Không tìm thấy id user'
                })
            }

            await userModel.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
        } catch (e) {
            reject(e)
        }
    })
}//update user

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await userModel.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    errCode: '500',
                    message: 'Không tìm thấy user'
                })
            }

            await userModel.findByIdAndDelete(id)
            resolve({
                errCode: '0',
                message: 'Xóa thành công',
            })
        } catch (e) {
            reject(e)
        }
    })
}//xóa 1

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {

            await userModel.deleteMany({ _id: ids })
            resolve({
                errCode: '0',
                message: 'Xóa thành công',
            })
        } catch (e) {
            reject(e)
        }
    })
}//xóa nhiều

module.exports = {
    Register, checkEmail, checkPhone, checkMSSV,
    getUser,
    deleteUser,
    deleteManyUser,
    updateUser,
}