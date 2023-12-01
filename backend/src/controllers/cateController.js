const cateService = require('../services/categoryService')


let handleGetAllCategory = async(req, res) => {
    let id = '*'
    let category = await cateService.getCategory(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get all',
        data: category
    })
}

let handleGetCategoryById = async(req, res) => {
    const id = req.body.id
    console.log(id)
    let category = await cateService.getCategory(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get by id: ' + id,
        data: category
    })
}

module.exports = {
    handleGetAllCategory, handleGetCategoryById,
}