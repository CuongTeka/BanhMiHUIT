const proService = require('../services/productService')

//get product
let handleGetAllProduct = async(req, res) => {
    let id = '*'
    let product = await proService.getProduct(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get all',
        data: product
    })
}
let handleGetProductById = async(req, res) => {
    let id = req.body.id
    let product = await proService.getProduct(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get by id: ' + id,
        data: product
    })
}
let handleGetProductByName = async(req, res) => {
    let name = req.params.name
    let product = await proService.getProductByName(name)
    return res.status(200).json({
        errCode: 0,
        message: 'get by name: ' + name,
        data: product
    })
}

//create - update - delete

//WIP

module.exports = {
    handleGetAllProduct,
    handleGetProductById, handleGetProductByName,
}