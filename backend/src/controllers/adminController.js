const adminService = require('../services/adminService')


let handleGetAllUser = async(req, res) => {
    let id = '*'
    let user = await adminService.getUser(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get all',
        data: user
    })
}

let handleFindUserById = async(req, res) => {
    let id = req.body.id
    let user = await adminService.getUser(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get by id: ' + id,
        data: user
    })
}

//==========================================================

let handleGetAllProduct = async(req, res) => {
    let id = '*'
    let product = await adminService.getProduct(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get all',
        data: product
    })
}
let handleGetProductById = async(req, res) => {
    let id = req.body.id
    let product = await adminService.getProduct(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get by id: ' + id,
        data: product
    })
}


module.exports = {
    //user
    handleGetAllUser, handleFindUserById,
    //product
    handleGetAllProduct, handleGetProductById,
    //
}