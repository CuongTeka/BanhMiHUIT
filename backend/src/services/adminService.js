const userModel = require('../models/userModel');
const proModel = require('../models/productModel');

//get all and byID
let getUser = (Id) => {
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

let getProduct = (Id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = '';
            if(Id === '*'){
                product = await proModel.find({})
            }
            if(Id && Id !== '*'){
                product = await proModel.findOne({
                    _id: Id
                })
            }
            resolve(product)
        } catch (error) {
            reject(error)
        }
    })
}




module.exports = {
    getUser,
    getProduct,

}