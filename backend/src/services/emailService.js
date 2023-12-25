const nodemailer = require("nodemailer");
const otpModel = require("../models/otpModel");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "taikhoanso12711@gmail.com", // Your email address
    pass: "ssgletqpdvmqnyxk", // Your email password (consider using app-specific password)
  },
});

const createNewOTP = async (mail, otp) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingOTP = await otpModel.findOne({ mail });
      if (existingOTP) {
        existingOTP.otp = otp;
        existingOTP.timestamp = Date.now();
        await existingOTP.save();
        resolve({
          errCode: 0,
          message: "Gửi thành công",
        });
      } else {
        const newOTP = await otpModel.create({ mail, otp });
        if (newOTP) {
          resolve({
            errCode: 0,
            message: "Gửi thành công",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const generateOTP = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return randomNumber.toString().slice(-6);
};

const sendOTP = async (mail) => {
  return new Promise((resolve, reject) => {
    const newotp = generateOTP();
    const mailOptions = {
      from: "BanhMiHUIT <taikhoanso12711@gmail.com>", // mail gửi
      to: mail, // mail nhận
      subject: "Mã OTP cho tài khoản BanhMiHUIT",
      html: `<h1>${newotp} là mã xác thực OTP trên BanhMiHUIT.<br/> Mã có hiệu lực trong vòng 30 phút.<br/> Để đảm bảo an toàn, xin vui lòng không chia sẽ mã với bất kỳ ai</h1>`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Lỗi: ", error);
        reject(error);
      } else {
        createNewOTP(mail, newotp)
          .then(() => {
            // console.log("Email sent:", info.response);
            resolve();
          })
          .catch((err) => {
            console.error("Error with OTP:", err);
            reject(err);
          });
      }
    });
  });
};

module.exports = {
  sendOTP,
};
