const userModel = require("../models/userModel");
const otpModel = require("../models/otpModel");
const bcrypt = require("bcrypt");
const session = require("express-session");

const MAX_OTP_AGE = 30 * 60 * 1000;

let handleLogin = (email, pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkEmail(email);
      if (isExist) {
        let user = await userModel.findOne({
          email: email,
        }); //tìm lại email rồi check mật khẩu
        if (user) {
          let checkPass = await bcrypt.compareSync(pass, user.password);
          if (checkPass) {
            let securedData = await userModel
              .findOne({ _id: user._id })
              .select({ _id: 1, role: 1 }); //chỉ lấy _id và role
            // console.log(securedData);
            userData.errCode = 0; //đúng mật khẩu
            userData.message = "Logging...";
            userData.user = securedData;
            // session.user=user
          } else {
            userData.errCode = 3; //sai mật khẩu
            userData.message = "Email hoặc mật khẩu không hợp lệ";
          }
        } else {
          userData.errCode = 2; //email ko tồn tại(1)
          userData.message = "Email hoặc mật khẩu không hợp lệ";
        }
      } else {
        userData.errCode = 1; //email ko tồn tại
        userData.message = "Email hoặc mật khẩu không hợp lệ";
      }
      resolve(userData);
    } catch (error) {
      console.log(error);
    }
  });
};

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

let checkOTP = async (mail, otp) => {
  return new Promise(async (resolve, reject) => {
    try {
      const storedOTP = await otpModel.findOne({ mail, otp });
      if (storedOTP) {
        const otpAge = Date.now() - storedOTP.timestamp;

        if (otpAge <= MAX_OTP_AGE) {
          resolve({
            errCode: 0,
            message: "OTP hợp lệ",
          }); //otp hợp lệ
        } else {
          deleteOTP(mail);
          resolve({
            errCode: 1,
            message: "OTP đã hết hạn",
          }); //otp hết hạn
        }
      } else {
        deleteOTP(mail);
        resolve({
          errCode: 2,
          message: "OTP không hợp lệ",
        }); //không tìm thấy otp trong db
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

const deleteOTP = (mail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOTP = await otpModel.findOne({
        mail: mail,
      });
      if (checkOTP === null) {
        resolve({
          errCode: 1,
          message: "Không tìm thấy OTP",
        });
      }

      await otpModel.findOneAndDelete(mail);
      resolve({
        errCode: 0,
        message: "Đã xóa OTP",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleLogin,
  checkOTP,
};
