const orderService = require('../services/orderService')

let handleGetAllOrder = async(req, res) => {
    let id = '*'
    let order = await orderService.getOrder(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get all',
        data: order
    })
}

let handleGetOrderById = async(req, res) => {
    let id = req.body.id
    let order = await orderService.getOrder(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get order by id',
        data: order
    })
}





module.exports = {
    handleGetAllOrder, handleGetOrderById,
}