const orderModel = require('../models/orderModel');
// const proModel = require('../models/productModel')

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

let getOrderByCustomerName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = '';
            if(name){
                const regex = new RegExp(name, 'i');
                order = await proModel.find({
                    customer: regex
                })
            }
            resolve(order)
        } catch (error) {
            reject(error)
        }
    })
}//tìm order theo tên khách hàng

// create - update - delete
const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { customer, item, total, payment, status, shipping, note } = newOrder
        // const item = [pro_id, quantity, custom]
        try {
            const newOrder = await orderModel.create({
                customer, 
                item, 
                total, 
                payment, 
                status, 
                shipping,
                note
            })
            if (newOrder) {
                resolve({
                    errCode: 0,
                    message: 'Insert Successed'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        const { customer, item, total, payment, status, shipping, note } = data
        try {
            const existingOrder = await orderModel.findById(id)
            if (existingOrder === null) {
                resolve({
                    errCode: 1,
                    message: 'Không tìm thấy product'
                })
            }
            existingOrder.customer = data.customer || existingOrder.customer;
            existingOrder.item = data.item || existingOrder.item;
            existingOrder.total = data.total || existingOrder.total;
            existingOrder.payment = data.payment || existingOrder.payment;
            existingOrder.status = data.status || existingOrder.status;
            existingOrder.shipping = data.shipping || existingOrder.shipping;
            existingOrder.note = data.note || existingOrder.note;
            existingOrder.date_edit = Date.now();
            await existingOrder.save();
        
            resolve({
                errCode: 0,
                message: 'Update successed',
            })
        } catch (e) {
            reject(e)
        }
    })
}//update

// const deleteOrder = (id) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkOrder = await orderModel.findOne({
//                 _id: id
//             })
//             if (checkOrder === null) {
//                 resolve({
//                     errCode: 1,
//                     message: 'Không tìm thấy order'
//                 })
//             }

//             await orderModel.findByIdAndDelete(id)
//             resolve({
//                 errCode: 0,
//                 message: 'Delete successed',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }//un-use
// const deleteManyOrder = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await orderModel.deleteMany({ _id: ids })
//             resolve({
//                 errCode: 0,
//                 message: 'Delete successed',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }//un-use

module.exports = {
    getOrder,
    createOrder, updateOrder,
}