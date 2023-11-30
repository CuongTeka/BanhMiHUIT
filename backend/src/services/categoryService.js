const cateModel = require('../models/categoryModel');

let getCategory = (Id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cate = '';
            if(Id === '*'){
                cate = await cateModel.find({})
            }
            if(Id && Id !== '*'){
                cate = await cateModel.findOne({
                    _id: Id
                })
            }
            resolve(cate)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getCategory,  
}