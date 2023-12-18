const userService = require("../services/userService");
//tạm thời đầy đủ

let handleGetAllUser = async (req, res) => {
  let id = "*";
  let user = await userService.getUser(id);
  return res.status(200).json({
    errCode: 0,
    message: "get all",
    data: user,
  });
};

let handleFindUserById = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUser(id);
  return res.status(200).json({
    errCode: 0,
    message: "get by id: " + id,
    data: user,
  });
};

const hangleChangePassword = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    if (!id) {
      return res.status(400).json({
        errCode: 500,
        message: "userId not found",
      });
    }
    let check = await userService.changePassword(id, data);
    if (check.errCode == 0) {
      return res.status(200).json({
        errCode: 0,
        message: "Đổi mật khẩu thành công",
      });
    } else {
      return res.status(400).json({
        errCode: check.errCode,
        message: check.message,
      });
    }
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
}; //done

const handleChangeUserInfo = async (req, res) => {
  // const { email, pass, name, mssv, phone, role } = req.body;
  const id = req.params.id;
  const data = req.body;
  try {
    if (!id) {
      return res.status(400).json({
        errCode: 500,
        message: "userId not found",
      });
    }
    let check = await userService.updateUserNoPass(id, data);
    if (check.errCode === 0) {
      return res.status(200).json({
        errCode: 0,
        message: "Update thành công",
      });
    } else {
      return res.status(400).json({
        errCode: check.errCode,
        message: check.message,
      });
    }
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  // const { email, pass, name, mssv, phone, role } = req.body;
  const id = req.params.id;
  const data = req.body;
  try {
    if (!id) {
      return res.status(400).json({
        errCode: 500,
        message: "userId not found",
      });
    }
    let check = await userService.updateUser(id, data);
    if (check.errCode === 0) {
      return res.status(200).json({
        errCode: 0,
        message: "Update thành công",
      });
    }
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
}; //done
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        errCode: 500,
        message: "The userId is required",
      });
    }
    await userService.deleteUser(userId);
    return res.status(200).json({
      errCode: 0,
      message: "Xóa thành công",
    });
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
}; //done
const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(400).json({
        errCode: 500,
        message: "The ids is required",
      });
    }
    await userService.deleteManyUser(ids);
    return res.status(200).json({
      errCode: 0,
      message: "Xóa thành công",
    });
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
}; //WIP

module.exports = {
  handleGetAllUser,
  handleFindUserById,
  updateUser,
  hangleChangePassword,
  handleChangeUserInfo,
  deleteUser,
  deleteMany,
};
