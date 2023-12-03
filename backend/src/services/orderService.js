const orderModel = require('../models/orderModel');

//get order
let getOrder = (Id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = '';
            if(Id === '*'){
                order = await orderModel.find({})
            }
            if(Id && Id !== '*'){
                order = await orderModel.findOne({
                    _id: Id,
                })
            }
            resolve(order)
        } catch (error) {
            reject(error)
        }
    })
}
// let getProductByName = (name) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let product = '';
//             if(name){
//                 const regex = new RegExp(name, 'i');
//                 product = await proModel.find({
//                     name: regex
//                 })
//             }
//             resolve(product)
//         } catch (error) {
//             reject(error)
//         }
//     })
// }

//create - update - delete
// const createProduct = (newProduct) => {
//     return new Promise(async (resolve, reject) => {
//         const { name, category_id, detail, price, discount, image } = newProduct
//         try {
//             const newProduct = await proModel.create({
//                 name, 
//                 category_id, 
//                 price, 
//                 discount, 
//                 detail, 
//                 image
//             })
//             if (newProduct) {
//                 resolve({
//                     errCode: 0,
//                     message: 'Insert Successed'
//                 })
//             }
//         } catch (e) {
//             reject(e)
//         }
//     })
// }//done
// const updateProduct = (data) => {
//     return new Promise(async (resolve, reject) => {
//         const { id, name, category_id, detail, price, discount, image, is_active } = data
//         try {
//             const checkProduct = await proModel.findOne({
//                 _id: id
//             })
//             if (checkProduct === null) {
//                 resolve({
//                     errCode: 1,
//                     message: 'Không tìm thấy product'
//                 })
//             }

//             const updatedProduct = await proModel.findByIdAndUpdate(id, {name, category_id, detail, price, discount, image, date_edit: Date.now(), is_active})
//             if(updatedProduct){
//                 resolve({
//                     errCode: 0,
//                     message: 'Update successed',
//                 })
//             }
//         } catch (e) {
//             reject(e)
//         }
//     })
// }//done
// const deleteProduct = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkProduct = await proModel.findOne({
//                 _id: id
//             })
//             if (checkProduct === null) {
//                 resolve({
//                     errCode: 1,
//                     message: 'Không tìm thấy product'
//                 })
//             }

//             await proModel.findByIdAndDelete(id)
//             resolve({
//                 errCode: 0,
//                 message: 'Delete product successed',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }//done
// const deleteManyProduct = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await proModel.deleteMany({ _id: ids })
//             resolve({
//                 errCode: '0',
//                 message: 'Delete products successed',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

module.exports = {
    getOrder,
}