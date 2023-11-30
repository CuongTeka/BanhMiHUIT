const userService = require('../services/userService')


let handleGetAllUser = async(req, res) => {
    let id = '*'
    let user = await userService.getUser(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get all',
        data: user
    })
}

let handleFindUserById = async(req, res) => {
    let id = req.body.id
    let user = await userService.getUser(id)
    return res.status(200).json({
        errCode: 0,
        message: 'get by id: ' + id,
        data: user
    })
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(400).json({
                errCode: '500',
                message: 'userId not found'
            })
        }
        await UserService.updateUser(userId, data)
        return res.status(200).json({
            errCode: '0',
            message: 'Update thành công'
        })
    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(400).json({
                status: '500',
                message: 'The userId is required'
            })
        }
        await userService.deleteUser(userId)
        return res.status(200).json({
            errCode: '0',
            message: 'Xóa thành công'
        })
    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}
const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(400).json({
                status: '500',
                message: 'The ids is required'
            })
        }
        await userService.deleteManyUser(ids)
        return res.status(200).json({
            errCode: '0',
            message: 'Xóa thành công'
        })
    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}




module.exports = {
    handleGetAllUser, handleFindUserById,
    updateUser,
    deleteUser,deleteMany,
}