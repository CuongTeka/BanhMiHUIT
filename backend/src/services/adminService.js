const userModel = require('../models/userModel');
const proModel = require('../models/productModel');
const e = require('express');

let getAllUser = (Id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if(Id === '*'){
                users = await userModel.find({})
            }
            if(Id && Id !== '*'){
                users = await userModel.findOne({
                    _id: Id
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}




module.exports = {
    
}