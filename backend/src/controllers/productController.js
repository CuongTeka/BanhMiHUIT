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
const createProduct = async (req, res) => {
    try {
        const { name, category_id, detail, price, discount, image } = req.body
        if (!name || !category_id || !detail || !price || !discount || !image) {
            return res.status(400).json({
                errCode: 400,
                message: 'Vui lòng nhập dữ liệu'
            })
        }
        const check = await proService.createProduct(req.body)
        if(check.errCode == 0)
        {
            return res.status(200).json(check)
        }else{
            return res.status(400).json(check)
        }
    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}//done

const updateProduct = async (req, res) => {
    try {
        const { id, name, category_id, detail, price, discount, image } = req.body
        const data = req.body;
        if (!id) {
            return res.status(400).json({
                errCode: 0,
                message: 'Thiếu ID'
            })
        }
        const check = await proService.updateProduct(data)
        if(check.errCode == 0)
        {
            return res.status(200).json(check)
        }else{
            return res.status(400).json(check)
        }
    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}//done

const deleteProduct = async (req, res) => {
    try {
        const id = req.body.id
        if (!id) {
            return res.status(400).json({
                errCode: 1,
                message: 'Thiếu id'
            })
        }
        const check = await proService.deleteProduct(id)
        if(check){
            return res.status(200).json(check)
        }else{
            return res.status(400).json(check)
        }
    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}//done

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}//WIP


module.exports = {
    handleGetAllProduct,
    handleGetProductById, handleGetProductByName,
    createProduct, updateProduct, deleteProduct, deleteMany,
}