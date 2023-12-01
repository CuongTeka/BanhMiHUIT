const proModel = require('../models/productModel');

//get product
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
let getProductByName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = '';
            if(name){
                const regex = new RegExp(name, 'i');
                product = await proModel.find({
                    name: regex
                })
            }
            resolve(product)
        } catch (error) {
            reject(error)
        }
    })
}

//create - update - delete
const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, category_id, detail, price, discount, image } = newProduct
        try {
            const newProduct = await proModel.create({
                name, 
                category_id, 
                price, 
                discount, 
                detail, 
                image
            })
            if (newProduct) {
                resolve({
                    errCode: '0',
                    message: 'Insert Successed'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await proModel.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    errCode: '1',
                    message: 'Không tìm thấy product'
                })
            }

            const updatedProduct = await proModel.findByIdAndUpdate(id, data)
            resolve({
                errCode: '0',
                message: 'Update successed',
            })
        } catch (e) {
            reject(e)
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await proModel.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    errCode: '1',
                    message: 'Không tìm thấy product'
                })
            }

            await proModel.findByIdAndDelete(id)
            resolve({
                errCode: '0',
                message: 'Delete product successed',
            })
        } catch (e) {
            reject(e)
        }
    })
}
const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await proModel.deleteMany({ _id: ids })
            resolve({
                errCode: '0',
                message: 'Delete products successed',
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getProduct, getProductByName,
    createProduct, updateProduct, deleteProduct, deleteManyProduct,
}
