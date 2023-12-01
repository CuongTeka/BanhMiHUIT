const userService = require('../services/userService')
//tạm thời đầy đủ

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
    const { id, email, pass, name, mssv, phone, role } = req.body;
    const data = req.body;
    try {
        // const userId = req.params.id
        // const data = req.body
        if (!id) {
            return res.status(400).json({
                errCode: '500',
                message: 'userId not found'
            })
        }
        let check = await userService.updateUser(data)
        if(check.errCode === 0){
            return res.status(200).json({
                errCode: '0',
                message: 'Update thành công'
            })
        }
        
    } catch (e) {
        return res.status(400).json({
            message: e
        })
    }
}//done
const deleteUser = async (req, res) => {
    try {
        const userId = req.body.id
        if (!userId) {
            return res.status(400).json({
                errCode: '500',
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
}//done
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
}//WIP




module.exports = {
    handleGetAllUser, handleFindUserById,
    updateUser,
    deleteUser,deleteMany,
}