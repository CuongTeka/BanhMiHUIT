const userModel = require("../models/userModel");
const cateModel = require("../models/categoryModel");
const productModel = require("../models/productModel");
const bcrypt = require("bcrypt");

let Register = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email, pass, name, mssv, phone } = newUser;
    try {
      const encryptPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(5));
      const createUser = await userModel.create({
        email,
        password: encryptPass,
        name,
        mssv,
        phone,
      });
      if (createUser) {
        resolve({
          errCode: 0,
          message: "Tạo tài khoản thành công",
        });
      }
    } catch (error) {
      // console.log(error)
      reject(error);
    }
  });
}; //thêm user

let checkEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await userModel.findOne({
        email: email,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let checkPhone = (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await userModel.findOne({
        phone: phone,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let checkMSSV = (mssv) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await userModel.findOne({
        mssv: mssv,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getUser = (Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (Id === "*") {
        users = await userModel.find({}).select({ password: 0 });
      }
      if (Id && Id !== "*") {
        users = await userModel
          .findOne({
            _id: Id,
          })
          .select({ password: 0 });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
}; //lấy user

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const { email, pass, name, mssv, phone, role } = data;
    try {
      const checkUser = await userModel.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          errCode: 500,
          message: "Không tìm thấy id user",
        });
      }
      const encryptPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(5));
      await userModel.findByIdAndUpdate(id, {
        email,
        password: encryptPass,
        name,
        mssv,
        phone,
        role,
        date_update: Date.now(),
      });
      resolve({
        errCode: 0,
        message: "SUCCESS",
      });
    } catch (e) {
      reject(e);
    }
  });
}; //update user

const updateUserNoPass = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const { email, pass, name, mssv, phone } = data;
    try {
      const checkUser = await userModel.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          errCode: 500,
          message: "Không tìm thấy id user",
        });
      } //tìm bằng id trước
      let checkPass = bcrypt.compareSync(pass, checkUser.password);
      if (checkPass) {
        await userModel.findByIdAndUpdate(id, {
          email,
          name,
          mssv,
          phone,
          date_update: Date.now(),
        });
        resolve({
          errCode: 0,
          message: "Cập nhật thông tin thành công",
        });
      } else {
        resolve({
          errCode: 400,
          message: "Mật khẩu bạn nhập không khớp, vui lòng kiểm tra lại",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const changePassword = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const { oldpass, newpass } = data;
    try {
      const checkUser = await userModel.findOne({
        _id: id,
      }); //check id tồn tại
      if (checkUser === null) {
        resolve({
          errCode: 500,
          message: "Không tìm thấy id user",
        });
      } //kiểm tra hash oldpass với pass có trong db
      let checkPass = bcrypt.compareSync(oldpass, checkUser.password);
      if (checkPass) {
        const encryptPass = bcrypt.hashSync(newpass, bcrypt.genSaltSync(5));
        await userModel.findByIdAndUpdate(id, {
          password: encryptPass,
          date_update: Date.now(),
        });
        resolve({
          errCode: 0,
          message: "Thay đổi mật khẩu thành công",
        }); //tiến hành đổi
      } else {
        resolve({
          errCode: 400,
          message: "Mật khẩu cũ không khớp",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}; //điều chỉnh

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await userModel.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          errCode: 500,
          message: "Không tìm thấy user",
        });
      }

      await userModel.findByIdAndDelete(id);
      resolve({
        errCode: 0,
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
}; //xóa 1

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await userModel.deleteMany({ _id: ids });
      resolve({
        errCode: 0,
        message: "Xóa thành công",
      });
    } catch (e) {
      reject(e);
    }
  });
}; //xóa nhiều WIP

module.exports = {
  Register,
  checkEmail,
  checkPhone,
  checkMSSV,
  getUser,
  deleteUser,
  deleteManyUser,
  updateUser,
  changePassword,
  updateUserNoPass,
};
